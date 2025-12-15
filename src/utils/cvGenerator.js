import { jsPDF } from 'jspdf';
import profileImage from '../assets/cv/imagencv.png';

export const generateCV = () => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  // Theme Colors - Professional Palette
  const colors = {
    primary: [37, 99, 235],      // #2563EB (Blue-600)
    secondary: [30, 41, 59],     // #1E293B (Slate-800)
    accent: [59, 130, 246],      // #3B82F6 (Blue-500)
    bgSidebar: [248, 250, 252],  // #F8FAFC (Slate-50)
    textDark: [15, 23, 42],      // #0F172A (Slate-900)
    textGray: [71, 85, 105],     // #475569 (Slate-600)
    textLight: [148, 163, 184],  // #94A3B8 (Slate-400)
    white: [255, 255, 255]
  };

  // --- LAYOUT SETUP ---
  const sidebarWidth = 65; // mm
  const mainContentStart = sidebarWidth + 15;
  const mainContentWidth = pageWidth - mainContentStart - 15;

  // Draw Sidebar Background
  doc.setFillColor(...colors.bgSidebar);
  doc.rect(0, 0, sidebarWidth, pageHeight, 'F');

  // Draw Decorative Top Bar (Gradient simulation)
  doc.setFillColor(...colors.primary);
  doc.rect(0, 0, pageWidth, 5, 'F');

  // --- SIDEBAR CONTENT ---
  let yPos = 30;

  // 1. Profile Avatar / Badge
  const avatarSize = 20; // Reducido de 25 a 20
  const avatarX = sidebarWidth / 2;
  
  // Usar imagen de perfil real
  try {
    // Crear una imagen temporal para obtener las dimensiones originales
    const img = new Image();
    img.src = profileImage;
    
    // Definir el ancho máximo deseado (en mm)
    const maxWidth = avatarSize * 2.5; // 50mm de ancho máximo (aumentado de 40mm)
    
    // Calcular las dimensiones manteniendo la proporción
    let imgWidth = maxWidth;
    let imgHeight = maxWidth; // Por defecto cuadrado, se ajustará con la proporción real
    
    // Si podemos obtener las dimensiones reales, calcular la proporción
    if (img.naturalWidth && img.naturalHeight) {
      const aspectRatio = img.naturalHeight / img.naturalWidth;
      imgHeight = imgWidth * aspectRatio;
    }
    
    // Centrar la imagen (bajada un poco)
    const imgX = avatarX - (imgWidth / 2);
    const imgY = yPos - (imgHeight / 2) + 3; // +3mm para bajar la imagen
    
    // Añadir imagen manteniendo proporciones
    doc.addImage(profileImage, 'PNG', imgX, imgY, imgWidth, imgHeight);
    
  } catch (error) {
    console.log('Error cargando imagen, usando iniciales:', error);
    // Fallback: usar iniciales si no se puede cargar la imagen
    doc.setFillColor(...colors.white);
    doc.circle(avatarX, yPos, avatarSize + 1, 'F');
    doc.setFillColor(...colors.secondary);
    doc.circle(avatarX, yPos, avatarSize, 'F');
    
    doc.setTextColor(...colors.white);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('MJA', avatarX, yPos + 10, { align: 'center' });
  }

  yPos += 40; // Aumentado de 35 a 40 para bajar un poco los apartados

  // Helper for Sidebar Sections
  const addSidebarTitle = (title) => {
    doc.setFontSize(12);
    doc.setTextColor(...colors.primary);
    doc.setFont('helvetica', 'bold');
    doc.text(title.toUpperCase(), 10, yPos);
    yPos += 8;
    // Underline
    doc.setDrawColor(...colors.textLight);
    doc.setLineWidth(0.1);
    doc.line(10, yPos - 3, sidebarWidth - 10, yPos - 3);
    yPos += 5;
  };

  // 2. Contact Info
  addSidebarTitle('CONTACTO');
  
  const contactItems = [
    { label: 'Ubicación', value: 'Hinojosa del Duque, Córdoba' },
    { label: 'Email', value: 'mariojuradoayuso@gmail.com' },
    { label: 'Teléfono', value: '635 023 726' },
    { label: 'Mi Portfolio', value: 'ayusox.github.io/portfolio/', link: 'https://ayusox.github.io/portfolio/' }
  ];

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  
  contactItems.forEach(item => {
    doc.setTextColor(...colors.secondary);
    doc.setFont('helvetica', 'bold');
    doc.text(item.label, 10, yPos);
    yPos += 5;
    
    doc.setTextColor(...colors.textGray);
    doc.setFont('helvetica', 'normal');
    
    // Si el item tiene un enlace, hacerlo clickeable
    if (item.link) {
      doc.setTextColor(...colors.primary); // Color azul para indicar que es un enlace
      doc.textWithLink(item.value, 10, yPos, { url: item.link });
    } else {
      doc.text(item.value, 10, yPos);
    }
    
    yPos += 6; // Reducido de 7 a 6 para contacto más compacto
  });

  yPos += 10; // Ajustado para mejor distribución vertical

  // 3. Skills (Visual Bars)
  addSidebarTitle('HABILIDADES');

  const skills = [
    { name: 'Python', pct: 0.9 },
    { name: 'Java', pct: 0.85 },
    { name: 'JavaScript', pct: 0.88 },
    { name: 'HTML / CSS', pct: 0.95 },
    { name: 'React', pct: 0.85 },
    { name: 'Seguridad', pct: 0.80 },
    { name: 'Redes', pct: 0.75 }
  ];

  skills.forEach(skill => {
    doc.setFontSize(9);
    doc.setTextColor(...colors.textDark);
    doc.text(skill.name, 10, yPos);
    yPos += 5;

    // Background Bar
    doc.setFillColor(226, 232, 240); // Slate-200
    doc.roundedRect(10, yPos - 3, sidebarWidth - 20, 2, 0.5, 0.5, 'F');

    // Progress Bar
    doc.setFillColor(...colors.primary);
    doc.roundedRect(10, yPos - 3, (sidebarWidth - 20) * skill.pct, 2, 0.5, 0.5, 'F');

    yPos += 6; // Reducido de 7 a 6 para habilidades más compactas
  });

  yPos += 12; // Aumentado para alinear con educación académica

  // 4. Interests
  addSidebarTitle('INTERESES');
  const interests = [
    'Desarrollo de Webs',
    'Frontend & UI/UX',
    'Frameworks Modernos',
    'Ciberseguridad Básica'
  ];

  doc.setFontSize(9);
  doc.setTextColor(...colors.textGray);
  interests.forEach(interest => {
    doc.text(`• ${interest}`, 10, yPos);
    yPos += 6; // Aumentado de 4 a 6 para mejor alineación
  });

  // --- MAIN CONTENT ---
  yPos = 35; // Reset Y for main column

  // 5. Header / Name
  doc.setFontSize(28);
  doc.setTextColor(...colors.textDark);
  doc.setFont('helvetica', 'bold');
  doc.text('MARIO JURADO AYUSO', mainContentStart, yPos);
  
  yPos += 10;
  doc.setFontSize(14);
  doc.setTextColor(...colors.primary);
  doc.setFont('helvetica', 'normal');
  doc.text('Desarrollador Frontend & Ciberseguridad', mainContentStart, yPos);

  yPos += 15;

  // 6. Profile Summary
  const boxHeight = 25;
  doc.setFillColor(241, 245, 249); // Slate-100
  doc.roundedRect(mainContentStart, yPos, mainContentWidth, boxHeight, 2, 2, 'F');
  doc.setDrawColor(...colors.primary);
  doc.setLineWidth(0.5);
  doc.line(mainContentStart, yPos, mainContentStart, yPos + boxHeight); // Left accent line

  doc.setFontSize(10);
  doc.setTextColor(...colors.textGray);
  const summaryText = "Desarrollador orientado a crear soluciones web seguras, visualmente atractivas y bien estructuradas. Me motiva combinar diseño web, inteligencia artificial y buenas prácticas de seguridad para construir productos útiles y confiables. Mi objetivo es desarrollar proyectos claros, prácticos y agradables de usar.";
  const splitSummary = doc.splitTextToSize(summaryText, mainContentWidth - 12);
  
  // Calcular la posición vertical centrada
  const textHeight = splitSummary.length * 4; // Aproximadamente 4mm por línea
  const centeredY = yPos + (boxHeight - textHeight) / 2 + 3; // +3 para ajuste fino (punto medio)
  
  doc.text(splitSummary, mainContentStart + 6, centeredY);

  yPos += 40; // Aumentado de 35 a 40 para bajar las secciones

  // Helper for Main Sections
  const addMainSection = (title) => {
    doc.setFontSize(14);
    doc.setTextColor(...colors.secondary);
    doc.setFont('helvetica', 'bold');
    
    // Icon circle decorative
    doc.setFillColor(...colors.primary);
    doc.circle(mainContentStart + 3, yPos - 4, 3, 'F');
    
    doc.text(title.toUpperCase(), mainContentStart + 10, yPos - 1);
    
    // Line separator
    doc.setDrawColor(226, 232, 240); // Slate-200
    doc.setLineWidth(0.5);
    doc.line(mainContentStart, yPos + 3, pageWidth - 15, yPos + 3);
    
    yPos += 15;
  };

  // 7. Experience
  addMainSection('EXPERIENCIA LABORAL');

  const experience = [
    {
      role: 'Desarrollador en Prácticas',
      company: 'Fersoft',
      location: 'Córdoba',
      period: '3 meses',
      details: 'Participación activa en el ciclo de vida de desarrollo de software. Apoyo en tareas de Wordpress y testing básico. Soporte técnico a usuarios finales.'
    },
    {
      role: 'Técnico de Redes en Prácticas',
      company: 'WGR Telecomunicaciones',
      location: 'Hinojosa del Duque',
      period: '3 meses',
      details: 'Configuración y mantenimiento de equipos de red (routers, switches). Monitorización de tráfico y resolución de incidencias de conectividad. Instalación de cableado estructurado.'
    }
  ];

  experience.forEach(exp => {
    doc.setFontSize(12);
    doc.setTextColor(...colors.textDark);
    doc.setFont('helvetica', 'bold');
    doc.text(exp.role, mainContentStart, yPos);
    
    // Date badge
    doc.setFontSize(9);
    doc.setTextColor(...colors.white);
    doc.setFillColor(...colors.accent);
    const dateText = exp.period;
    const dateWidth = doc.getTextWidth(dateText) + 6;
    doc.roundedRect(pageWidth - 15 - dateWidth, yPos - 4, dateWidth, 6, 1, 1, 'F');
    doc.text(dateText, pageWidth - 15 - dateWidth + 3, yPos);

    yPos += 6;
    doc.setFontSize(10);
    doc.setTextColor(...colors.primary);
    doc.setFont('helvetica', 'bold');
    doc.text(`${exp.company} | ${exp.location}`, mainContentStart, yPos);
    
    yPos += 6;
    doc.setFontSize(10);
    doc.setTextColor(...colors.textGray);
    doc.setFont('helvetica', 'normal');
    const descLines = doc.splitTextToSize(exp.details, mainContentWidth);
    doc.text(descLines, mainContentStart, yPos);
    
    yPos += 18;
  });

  yPos += 8; // Aumentado de 5 a 8 para más separación entre secciones

  // 8. Education
  addMainSection('EDUCACIÓN ACADÉMICA');

  const education = [
    {
      degree: 'Desarrollo de Aplicaciones Web (DAW)',
      school: 'Formación Profesional Grado Superior',
      year: '2025 - 2026'
    },
    {
      degree: 'Máster en Ciberseguridad',
      school: 'Especialización Profesional',
      year: '2024 - 2025'
    },
    {
      degree: 'Desarrollo de Aplicaciones Multiplataforma (DAM)',
      school: 'Formación Profesional Grado Superior',
      year: '2020 - 2022'
    },
    {
      degree: 'Sistemas Microinformáticos y Redes (SMR)',
      school: 'Formación Profesional Grado Medio',
      year: '2018 - 2020'
    }
  ];

  education.forEach(edu => {
    doc.setFontSize(11);
    doc.setTextColor(...colors.textDark);
    doc.setFont('helvetica', 'bold');
    doc.text(edu.degree, mainContentStart, yPos);
    
    yPos += 5;
    doc.setFontSize(10);
    doc.setTextColor(...colors.textGray);
    doc.setFont('helvetica', 'normal');
    doc.text(edu.school, mainContentStart, yPos);
    
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(...colors.textLight);
    doc.text(edu.year, pageWidth - 15, yPos, { align: 'right' });
    
    yPos += 12;
  });

  // Footer / Bottom Brand
  const bottomY = pageHeight - 10;
  doc.setFontSize(8);
  doc.setTextColor(...colors.textLight);
  doc.text('CV generado automáticamente desde portafolio web', pageWidth / 2, bottomY, { align: 'center' });

  doc.save('Mario_Jurado_Ayuso_CV.pdf');
};