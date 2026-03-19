# 🚀 Guía de Desarrollo Local - OG BEAT PRODUCTION

## 🔧 Solución a Problemas CORS y Seguridad

### Problema: "Unsafe attempt to load URL"
Este error ocurre al abrir archivos locales vía `file://` debido a políticas de seguridad del navegador.

### ✅ Soluciones Implementadas

#### 1. **Atributos CORS Añadidos**
```html
<!-- Preconnect para Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Crossorigin para recursos externos -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/flatpickr" crossorigin="anonymous"></script>
```

#### 2. **Modo Debug Controlado**
```javascript
// Cambiar a true para desarrollo, false para producción
const DEBUG_MODE = false;
```

### 🌐 Opciones de Despliegue Local

#### Opción A: Servidor Local (Recomendado)
```bash
# Usando Python 3
python -m http.server 8000

# Usando Node.js
npx serve .

# Usando PHP
php -S localhost:8000
```

Luego accede a: `http://localhost:8000`

#### Opción B: Extensiones VS Code
- **Live Server**: Clic derecho en index.html → "Open with Live Server"
- **Live Preview**: Instalar extensión Live Preview

#### Opción C: Docker
```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
```

### 🛠️ Configuración de Desarrollo

#### Activar Debug Mode
```javascript
// En script.js, cambiar la constante:
const DEBUG_MODE = true;  // Muestra logs detallados
```

#### Funciones de Debug Disponibles
```javascript
// En consola del navegador:
debugReservas()                    // Ver estado de reservas
verificarHorasOcupadas("2026-03-20") // Ver horas específicas
simularReserva("2026-03-20", "10:00") // Simular reserva
limpiarReservas()                   // Limpiar todas las reservas
toggleDebug()                      // Activar/desactivar debug
```

### 📱 Testing en Dispositivos Móviles

#### Con Chrome DevTools
1. Abrir DevTools (F12)
2. Clic en "Toggle device toolbar"
3. Seleccionar dispositivo móvil
4. Probar funcionalidad táctil

#### Con Red Local
```bash
# Iniciar servidor en red
python -m http.server 0.0.0.0:8000

# Acceder desde otros dispositivos
http://[TU_IP]:8000
```

### 🔍 Problemas Comunes y Soluciones

#### Error: "Unsafe attempt to load URL"
- **Causa**: Abrir archivo directamente via file://
- **Solución**: Usar servidor local (ver opciones arriba)

#### Error: "Mixed Content"
- **Causa**: HTTP y HTTPS mezclados
- **Solución**: Asegurar que todo sea HTTPS

#### Fuentes no cargan
- **Causa**: Bloqueo CORS
- **Solución**: Atributos crossorigin ya implementados

#### Flatpickr no funciona
- **Causa**: Script no carga
- **Solución**: Verificar conexión a internet

### 🚀 Optimizaciones Implementadas

#### 1. **Console.log Limpios**
- Solo errores críticos se muestran en producción
- Debug mode controlado por variable
- Mensajes decorativos eliminados

#### 2. **Recursos Externos Optimizados**
- Preconnect para Google Fonts
- Crossorigin para todos los CDNs
- Fallbacks para imágenes

#### 3. **Rendimiento**
- Lazy loading para imágenes
- Animaciones optimizadas
- Event listeners eficientes

### 📋 Checklist Antes de Despliegue

- [ ] Cambiar `DEBUG_MODE = false`
- [ ] Probar en servidor local
- [ ] Verificar responsive design
- [ ] Testear formulario de reservas
- [ ] Probar en diferentes navegadores
- [ ] Validar todos los enlaces

### 🌟 Recomendaciones

1. **Usar siempre servidor local** para desarrollo
2. **Mantener DEBUG_MODE = false** en producción
3. **Monitorear consola** solo para errores reales
4. **Testear en múltiples dispositivos**
5. **Validar funcionalidad de reservas** regularmente

---

## 🎵 Características del Proyecto

- ✅ Sistema de reservas inteligente
- ✅ Diseño responsive Mobile First
- ✅ Animaciones y efectos neón
- ✅ Galería optimizada
- ✅ Formularios validados
- ✅ Integración WhatsApp
- ✅ Sin errores CORS

**¡Listo para desarrollo y producción!** 🚀
