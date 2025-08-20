import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Stack,
  TextField,
  Button,
  LinearProgress,
  alpha,
  useTheme,
  Box,
  Alert,
  Avatar,
  IconButton,
  Tooltip,
  InputBase,
  Divider,
} from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import KeyIcon from "@mui/icons-material/Key";
import SendIcon from "@mui/icons-material/Send";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SectionCard from "../../components/SectionCard";
import { useLanguage } from "../../context/LanguageContext";

const API_URL = "https://ishoes.fabiandev.org";
const ENDPOINT_HEALTH = `${API_URL}/api/chatbot/health`;
const ENDPOINT_STREAM = `${API_URL}/api/chatbot/stream`;

const bubble = (own, theme) => ({
  alignSelf: own ? "flex-end" : "flex-start",
  background: own ? theme.palette.primary.main : "#f6f8fa",
  color: own ? "#fff" : "#24292f",
  border: own
    ? `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
    : "1px solid #d0d7de",
  borderRadius: 12,
  padding: "10px 12px",
  maxWidth: "85%",
  boxShadow: own
    ? `0 2px 4px ${alpha(theme.palette.primary.main, 0.25)}`
    : "none",
});

function MessageRow({ role, content, time }) {
  const theme = useTheme();
  const own = role === "user";

  return (
    <Stack
      direction="row"
      spacing={1.25}
      sx={{
        alignItems: "flex-start",
        ...(own ? { ml: "auto", justifyContent: "flex-end" } : {}),
        maxWidth: "100%",
      }}
    >
      {!own && (
        <Avatar sx={{ width: 28, height: 28, bgcolor: "#57606a" }}>AI</Avatar>
      )}
      <Box sx={bubble(own, theme)}>
        <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
          {content}
        </Typography>
        {time && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ opacity: 0.7 }}
          >
            {time}
          </Typography>
        )}
      </Box>
      {own && (
        <Avatar
          sx={{ width: 28, height: 28, bgcolor: theme.palette.primary.main }}
        >
          Tú
        </Avatar>
      )}
    </Stack>
  );
}

export default function Chatbot() {
  const theme = useTheme();
  const { t, lang } = useLanguage(); 
  const heroBg = `linear-gradient(0deg, ${alpha(
    theme.palette.primary.main,
    theme.palette.mode === "dark" ? 0.12 : 0.08
  )}, transparent)`;

  // Auth
  const [apiKey, setApiKey] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);
  const [checkingKey, setCheckingKey] = useState(false);
  const [err, setErr] = useState("");

  // Chat
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: t("chatbot.restarted"),
      time: new Date().toLocaleTimeString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (
      !isAuthed &&
      messages.length === 1 &&
      messages[0].role === "assistant"
    ) {
      setMessages([
        {
          role: "assistant",
          content: t("chatbot.restarted"),
          time: new Date().toLocaleTimeString(),
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing]);

  const handleAuth = async () => {
    setCheckingKey(true);
    setErr("");
    try {
      if (!apiKey.trim()) throw new Error(t("chatbot.enterApiKey"));
      const res = await fetch(ENDPOINT_HEALTH, {
        headers: { "x-api-key": apiKey },
      });
      if (!res.ok) throw new Error(t("chatbot.invalidApiKey"));
      setIsAuthed(true);
    } catch (e) {
      setErr(e.message || t("chatbot.invalidApiKey"));
    } finally {
      setCheckingKey(false);
    }
  };

  const handleLogout = () => {
    setIsAuthed(false);
    setApiKey("");
    setErr("");
  };

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: t("chatbot.restarted"),
        time: new Date().toLocaleTimeString(),
      },
    ]);
  };
  const streamChat = async (payload, onDelta) => {
    const res = await fetch(ENDPOINT_STREAM, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": apiKey },
      body: JSON.stringify(payload),
    });
    if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);
    const reader = res.body.getReader();
    const decoder = new TextDecoder("utf-8");
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      onDelta(chunk);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || sending) return;

    const now = new Date().toLocaleTimeString();
    const userMsg = { role: "user", content: input.trim(), time: now };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setSending(true);
    setTyping(true);

    // placeholder para la respuesta que se irá llenando
    const assistantIndex = messages.length + 1;
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "", time: new Date().toLocaleTimeString() },
    ]);

    try {
      await streamChat({ messages: [...messages, userMsg] }, (delta) => {
        setMessages((prev) => {
          const next = [...prev];
          next[assistantIndex] = {
            ...next[assistantIndex],
            content: (next[assistantIndex].content || "") + delta,
          };
          return next;
        });
      });
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: t("chatbot.errorConnect"),
          time: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setSending(false);
      setTyping(false);
    }
  };

  const copyLast = async () => {
    const last = [...messages].reverse().find((m) => m.role === "assistant");
    if (!last?.content) return;
    try {
      await navigator.clipboard.writeText(last.content);
    } catch {}
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      {/* HERO*/}
      <Paper
        elevation={3}
        sx={{
          p: { xs: 3, md: 5 },
          mb: 4,
          borderRadius: 4,
          textAlign: "center",
          background: heroBg,
        }}
      >
        <Stack spacing={{ xs: 2.5, md: 3 }} alignItems="center">
          <Typography
            fontWeight={900}
            sx={{
              lineHeight: 1.1,
              fontSize: {
                xs: "clamp(28px,8.5vw,40px)",
                sm: "clamp(36px,6.5vw,52px)",
                md: "clamp(44px,5.5vw,64px)",
              },
            }}
          >
            {t("chatbot.title")}
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 900 }}>
            {t("chatbot.subtitle")}
          </Typography>
        </Stack>
      </Paper>

      {/* Paso 1: Validar API key */}
      {!isAuthed && (
        <SectionCard
          icon={<KeyIcon color="primary" />}
          title={t("chatbot.accessTitle")}
        >
          <Stack spacing={2}>
            {!!err && <Alert severity="error">{err}</Alert>}
            <TextField
              label={t("chatbot.apiKeyLabel")}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              type="password"
              autoComplete="new-password"
              name="ai-api-key"
              inputProps={{ "data-lpignore": "true", "data-1p-ignore": "true" }}
              required
              helperText={t("chatbot.apiKeyHelp")}
            />
            <Button
              variant="contained"
              onClick={handleAuth}
              disabled={checkingKey || !apiKey.trim()}
            >
              {checkingKey ? t("chatbot.verifying") : t("chatbot.continue")}
            </Button>
          </Stack>
        </SectionCard>
      )}

      {/* Paso 2: Chat */}
      {isAuthed && (
        <SectionCard
          icon={<SmartToyIcon color="primary" />}
          title={t("chatbot.chatTitle")}
        >
          <Stack spacing={2}>
            {!!err && <Alert severity="error">{err}</Alert>}
            <Paper
              variant="outlined"
              sx={{
                p: 1.25,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                bgcolor: (th) =>
                  th.palette.mode === "dark" ? "background.paper" : "#f6f8fa",
                borderColor: "divider",
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <Button size="small" onClick={handleLogout}>
                  {t("chatbot.logout")}
                </Button>
                <Button
                  size="small"
                  startIcon={<DeleteOutlineIcon />}
                  onClick={clearChat}
                  color="inherit"
                >
                  {t("chatbot.clear")}
                </Button>
                <Tooltip title={t("chatbot.copyLast")}>
                  <IconButton size="small" onClick={copyLast}>
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Paper>

            {/* Contenedor del chat */}
            <Box
              sx={{
                p: 1.5,
                borderRadius: 2,
                height: 480,
                display: "flex",
                flexDirection: "column",
                border: "1px solid",
                borderColor: "divider",
                bgcolor: (th) =>
                  th.palette.mode === "dark"
                    ? alpha(th.palette.background.paper, 0.8)
                    : alpha("#ffffff", 0.85),
                backdropFilter: "saturate(1.2) blur(8px)",
              }}
            >
              {/* Lista de mensajes */}
              <Box
                ref={scrollRef}
                sx={{
                  flex: 1,
                  overflowY: "auto",
                  p: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.25,
                  "&::-webkit-scrollbar": { width: 8 },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: (th) =>
                      alpha(th.palette.text.primary, 0.2),
                    borderRadius: 8,
                  },
                  "&::-webkit-scrollbar-track": { background: "transparent" },
                }}
              >
                {messages.map((m, i) => (
                  <MessageRow
                    key={i}
                    role={m.role}
                    content={m.content}
                    time={m.time}
                  />
                ))}

                {typing && (
                  <Stack
                    direction="row"
                    spacing={1.25}
                    sx={{ alignItems: "flex-start" }}
                  >
                    <Avatar sx={{ width: 28, height: 28, bgcolor: "#57606a" }}>
                      AI
                    </Avatar>
                    <Box sx={bubble(false, theme)}>
                      <Typography variant="body2">
                        {t("chatbot.typing")}
                      </Typography>
                    </Box>
                  </Stack>
                )}
              </Box>

              <Divider sx={{ my: 1 }} />

              {/* Input  */}
              <Box
                component="form"
                onSubmit={sendMessage}
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: 1,
                }}
              >
                <Paper
                  variant="outlined"
                  sx={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    borderRadius: 999,
                    px: 1,
                    py: 0.25,
                    borderColor: "divider",
                    bgcolor: (th) =>
                      th.palette.mode === "dark" ? "background.paper" : "#fff",
                  }}
                >
                  <InputBase
                    multiline
                    fullWidth
                    maxRows={6}
                    placeholder={t("chatbot.placeholder")}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) sendMessage(e);
                    }}
                    sx={{ px: 1.5, py: 1 }}
                  />
                </Paper>
                <Tooltip
                  title={sending ? t("chatbot.sending") : t("chatbot.send")}
                >
                  <span>
                    <IconButton
                      type="submit"
                      color="primary"
                      disabled={sending}
                      sx={{
                        border: "1px solid",
                        borderColor: "primary.main",
                        bgcolor: "primary.main",
                        color: "#fff",
                        "&:hover": { bgcolor: "primary.dark" },
                      }}
                    >
                      <SendIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              </Box>

              {sending && <LinearProgress sx={{ mt: 1 }} />}
            </Box>
          </Stack>
        </SectionCard>
      )}
    </Container>
  );
}
