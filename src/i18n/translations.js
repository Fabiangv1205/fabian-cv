// src/i18n/translations.js
const translations = {
  en: {
    nav: { home: "Home", skills: "Skills", projects: "Projects", contact: "Contact" },
    common: { downloadCV: "Download CV", github: "GitHub", switchTo: "Switch to" },
    home: {
      name: "Roberto Fabián González Vargas",
      title: "Full Stack & Linux Systems Engineer",
      subtitle:
        "Creating scalable, maintainable and user-centric solutions with React, Firebase and Linux tools.",
      summaryTitle: "Professional Summary",
      summaryText:
        "Full Stack and Linux Systems Engineer with hands-on experience in Linux administration, automation using Ansible, and modern web development with React, Express, and Django. Skilled in containerization with Docker and cloud-based tools. Over the past year, I’ve delivered tailored mobile and web applications for real-world clients, working independently or collaboratively. Focused on building scalable, maintainable, and user-centric software solutions.",
      workTitle: "Work Experience",
      freelance: "Freelance Web & Mobile Developer",
      period: "January 2024 – Present",
      portfolioTitle: "Portfolio Highlights",
      certificationsTitle: "Certifications & Trainings",
      educationTitle: "Education",
      viewProjects: "View projects →",
      bullets: {
        b1: "- Built cross-platform mobile apps using React Native for Android and iOS.",
        b2: "- Developed 'Tee-Time', a mobile app for managing golf reservations using React Native and Firebase.",
        b3: "- Built 'iShoes', an e-commerce mobile app with admin dashboard, image storage, cart animation and stock logic.",
        b4: "- Designed and implemented the backend for 'iShoes' using Express.js, Firebase Admin SDK and RESTful APIs.",
        b5: "- Created 'Control de Ingresos', a financial tracking app with user balance summaries and Firestore.",
        b6: "- Collaborated with clients to define requirements, timelines, and deliverables.",
        b7: "- Focused on clean, maintainable code and intuitive user experiences."
      },
      portfolio: {
        teetime: "🟢 Tee-Time",
        ishoes: "🟢 iShoes",
        ingresos: "🟢 Control de Ingresos",
        teetimeDesc: "Golf reservation app built with React Native",
        ishoesDesc: "E-commerce app with admin dashboard, backend and stock management",
        ingresosDesc: "Weekly summary and expense tracker with Firestore integration"
      }
    },
    skills: {
      title: "Technical Skills",
      subtitle: "A categorized list of tools, frameworks, and technologies I use professionally",
      frontend: "Frontend",
      backend: "Backend",
      devops: "DevOps & Infrastructure",
      linux: "Linux & CLI Tools",
      security: "Security Basics"
    },
    projects: {
      title: "Project Examples",
      subtitle: "A few practical examples demonstrating solutions I've built",
      screenshotsTitle: "Screenshots from app iShoes",
      screenshotsDesc:
        "Example login screen using Firebase Auth with form validation and role-based access. The backend is deployed on a self-hosted server and securely exposed to the internet through a Cloudflare Tunnel.",
      downloadApk: "Download iShoes App (APK)",
      fetchTitle: "Fetch Products from iShoes Backend",
      fetchDesc:
        "This example shows products retrieved from the iShoes backend REST API. Products can be added, edited, or deleted directly from the iShoes mobile app."
    },
    contact: {
      title: "Contact",
      linkedin: "LinkedIn Profile",
      location: "Guadalajara, Jalisco, Mexico"
    }
  },
  es: {
    nav: { home: "Inicio", skills: "Habilidades", projects: "Proyectos", contact: "Contacto" },
    common: { downloadCV: "Descargar CV", github: "GitHub", switchTo: "Cambiar a" },
    home: {
      name: "Roberto Fabián González Vargas",
      title: "Ingeniero Full Stack & Linux Systems",
      subtitle:
        "Creando soluciones escalables, mantenibles y centradas en el usuario con React, Firebase y herramientas Linux.",
      summaryTitle: "Resumen Profesional",
      summaryText:
        "Ingeniero Full Stack y de Sistemas Linux con experiencia práctica en administración de Linux, automatización con Ansible y desarrollo web moderno con React y Express. Conocimientos en contenerización con Docker y herramientas en la nube. Durante el último año, he entregado aplicaciones web y móviles personalizadas para clientes reales, trabajando de forma independiente o en equipo. Enfocado en construir soluciones escalables, mantenibles y centradas en el usuario.",
      workTitle: "Experiencia Laboral",
      freelance: "Desarrollador Web & Móvil Freelance",
      period: "Enero 2024 – Presente",
      portfolioTitle: "Proyectos Destacados",
      certificationsTitle: "Certificaciones y Cursos",
      educationTitle: "Educación",
      viewProjects: "Ver proyectos →",
      bullets: {
        b1: "- Desarrollo de apps móviles multiplataforma con React Native para Android e iOS.",
        b2: "- Desarrollo de 'Tee-Time', app de reservas de golf con React Native y Firebase.",
        b3: "- Desarrollo de 'iShoes', e-commerce móvil con panel admin, almacenamiento de imágenes, animación de carrito y stock.",
        b4: "- Diseño e implementación del backend de 'iShoes' con Express.js, Firebase Admin SDK y APIs REST.",
        b5: "- Creación de 'Control de Ingresos', app financiera con resúmenes por usuario y Firestore.",
        b6: "- Colaboración con clientes para definir requerimientos, tiempos y entregables.",
        b7: "- Enfoque en código limpio, mantenible y UX intuitiva."
      },
      portfolio: {
        teetime: "🟢 Tee-Time",
        ishoes: "🟢 iShoes",
        ingresos: "🟢 Control de Ingresos",
        teetimeDesc: "App de reservas de golf desarrollada con React Native",
        ishoesDesc: "App e-commerce con panel admin, backend y gestión de stock",
        ingresosDesc: "Resumen semanal y control de gastos con Firestore"
      }
    },
    skills: {
      title: "Habilidades Técnicas",
      subtitle: "Lista categorizada de herramientas y tecnologías que uso profesionalmente",
      frontend: "Frontend",
      backend: "Backend",
      devops: "DevOps e Infraestructura",
      linux: "Linux y Herramientas CLI",
      security: "Fundamentos de Seguridad"
    },
    projects: {
      title: "Ejemplos de Proyectos",
      subtitle: "Algunos ejemplos prácticos de soluciones que he construido",
      screenshotsTitle: "Capturas de la app iShoes",
      screenshotsDesc:
        "Pantalla de login con Firebase Auth, validación de formularios y RBAC. El backend está desplegado en un servidor propio y expuesto de forma segura a internet mediante Cloudflare Tunnel.",
      downloadApk: "Descargar iShoes (APK)",
      fetchTitle: "Consumo de productos desde el backend iShoes",
      fetchDesc:
        "Ejemplo de productos obtenidos del backend REST de iShoes. Se pueden agregar, editar o borrar desde la app móvil."
    },
    contact: {
      title: "Contacto",
      linkedin: "Perfil de LinkedIn",
      location: "Guadalajara, Jalisco, México"
    }
  }
};

export default translations;
