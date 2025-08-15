// src/components/SectionCard.jsx
import React from "react";
import { Card, CardHeader, CardContent, Typography, useTheme } from "@mui/material";

const SectionCard = ({ icon, title, action, children, sx }) => {
  const theme = useTheme();
  return (
    <Card
      elevation={2}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        backgroundColor: theme.palette.background.paper,
        ...sx,
      }}
    >
      <CardHeader
        avatar={icon}
        title={<Typography variant="h6" fontWeight={800}>{title}</Typography>}
        action={action}
        sx={{ pb: 0, "& .MuiCardHeader-title": { fontWeight: 800 } }}
      />
      <CardContent sx={{ pt: 2 }}>{children}</CardContent>
    </Card>
  );
};

export default SectionCard;
