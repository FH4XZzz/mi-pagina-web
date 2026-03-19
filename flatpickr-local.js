/* Flatpickr Simplificado - Versión Local Mejorada para OG BEAT PRODUCTION */

// Sistema básico de calendario local con API compatible
(function() {
    'use strict';
    
    // Función principal
    window.FlatpickrLocal = function(selector, options) {
        const input = document.querySelector(selector);
        if (!input) {
            console.warn('⚠️ Elemento no encontrado:', selector);
            return null;
        }

        // Crear contenedor del calendario
        const wrapper = document.createElement('div');
        wrapper.className = 'flatpickr-wrapper';
        wrapper.style.position = 'relative';
        wrapper.style.display = 'inline-block';
        wrapper.style.width = '100%';
        
        // Crear calendario
        const calendar = document.createElement('div');
        calendar.className = 'flatpickr-calendar';
        calendar.style.display = 'none';
        calendar.style.position = 'absolute';
        calendar.style.zIndex = '9999';
        calendar.style.top = '100%';
        calendar.style.left = '0';
        calendar.style.marginTop = '5px';

        // Envolver el input
        input.parentNode.insertBefore(wrapper, input);
        wrapper.appendChild(input);
        wrapper.appendChild(calendar);

        // Variables de estado
        let selectedDate = null;
        let currentMonth = new Date().getMonth();
        let currentYear = new Date().getFullYear();
        let isOpen = false;

        // Nombres de meses y días en español
        const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                           'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

        // Función para generar calendario
        function generateCalendar() {
            const firstDay = new Date(currentYear, currentMonth, 1).getDay();
            const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
            
            let html = `
                <div class="flatpickr-months">
                    <div class="flatpickr-month">
                        <span class="flatpickr-prev-month" data-action="prev">‹</span>
                        <span class="flatpickr-current-month">${monthNames[currentMonth]} ${currentYear}</span>
                        <span class="flatpickr-next-month" data-action="next">›</span>
                    </div>
                </div>
                <div class="flatpickr-weekdays">
                    ${dayNames.map(day => `<div class="flatpickr-weekday">${day}</div>`).join('')}
                </div>
                <div class="flatpickr-days">
            `;

            // Días vacíos al inicio
            for (let i = 0; i < firstDay; i++) {
                html += '<div class="flatpickr-day notInMonth"></div>';
            }

            // Días del mes
            const today = new Date();
            const minDate = options.minDate || new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

            for (let day = 1; day <= daysInMonth; day++) {
                const date = new Date(currentYear, currentMonth, day);
                const dateStr = formatDate(date);
                const isDisabled = date < minDate;
                let isOccupied = false;
                
                // Verificar si está deshabilitado por la función disable
                if (options.disable && Array.isArray(options.disable)) {
                    isOccupied = options.disable.some(disableFn => typeof disableFn === 'function' && disableFn(date));
                }
                
                const isToday = date.toDateString() === today.toDateString();
                const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();

                let classes = 'flatpickr-day';
                if (isDisabled) classes += ' disabled';
                if (isOccupied) classes += ' dia-ocupado';
                else if (!isDisabled) classes += ' dia-disponible';
                if (isToday) classes += ' today';
                if (isSelected) classes += ' selected';

                html += `<div class="${classes}" data-date="${dateStr}" ${isDisabled ? 'disabled' : ''}>${day}</div>`;
            }

            html += '</div>';
            calendar.innerHTML = html;
        }

        function handleCalendarClick(e) {
            const target = e.target;

            if (target.dataset.action === 'prev') {
                currentMonth--;
                if (currentMonth < 0) {
                    currentMonth = 11;
                    currentYear--;
                }
                generateCalendar();
            } else if (target.dataset.action === 'next') {
                currentMonth++;
                if (currentMonth > 11) {
                    currentMonth = 0;
                    currentYear++;
                }
                generateCalendar();
            } else if (target.classList.contains('flatpickr-day') && !target.classList.contains('disabled') && !target.classList.contains('dia-ocupado')) {
                // Seleccionar fecha
                const day = parseInt(target.textContent);
                selectedDate = new Date(currentYear, currentMonth, day);
                
                // Actualizar input
                input.value = formatDate(selectedDate);
                
                // Actualizar clases
                calendar.querySelectorAll('.flatpickr-day.selected').forEach(el => el.classList.remove('selected'));
                target.classList.add('selected');

                // Cerrar calendario
                closeCalendar();

                // Callback onChange
                if (options.onChange && typeof options.onChange === 'function') {
                    try {
                        options.onChange([selectedDate], formatDate(selectedDate), instance);
                    } catch (error) {
                        console.warn('⚠️ Error en callback onChange:', error);
                    }
                }
            }
        }

        function openCalendar() {
            if (!isOpen) {
                calendar.style.display = 'block';
                isOpen = true;
                generateCalendar();
                
                // Callback onOpen
                if (options.onOpen && typeof options.onOpen === 'function') {
                    try {
                        options.onOpen([], '', instance);
                    } catch (error) {
                        console.warn('⚠️ Error en callback onOpen:', error);
                    }
                }
            }
        }

        function closeCalendar() {
            if (isOpen) {
                calendar.style.display = 'none';
                isOpen = false;
                
                // Callback onClose
                if (options.onClose && typeof options.onClose === 'function') {
                    try {
                        options.onClose([], '', instance);
                    } catch (error) {
                        console.warn('⚠️ Error en callback onClose:', error);
                    }
                }
            }
        }

        function formatDate(date) {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        }

        // API de instancia
        const instance = {
            close: closeCalendar,
            open: openCalendar,
            destroy: () => {
                wrapper.parentNode.insertBefore(input, wrapper);
                wrapper.remove();
            },
            setDate: (date) => {
                if (date instanceof Date) {
                    selectedDate = date;
                    input.value = formatDate(date);
                    generateCalendar();
                }
            },
            clear: () => {
                selectedDate = null;
                input.value = '';
                generateCalendar();
            },
            selectedDates: () => selectedDate ? [selectedDate] : []
        };

        // Event listeners
        input.addEventListener('click', (e) => {
            e.preventDefault();
            openCalendar();
        });

        input.addEventListener('focus', (e) => {
            e.preventDefault();
            openCalendar();
        });

        calendar.addEventListener('click', handleCalendarClick);

        // Cerrar al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!wrapper.contains(e.target)) {
                closeCalendar();
            }
        });

        // Cerrar con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isOpen) {
                closeCalendar();
            }
        });

        // Callback onReady
        if (options.onReady && typeof options.onReady === 'function') {
            setTimeout(() => {
                try {
                    options.onReady([], '', instance);
                } catch (error) {
                    console.warn('⚠️ Error en callback onReady:', error);
                }
            }, 100);
        }

        return instance;
    };

    // Función global para compatibilidad
    window.flatpickr = function(selector, options) {
        return window.FlatpickrLocal(selector, options || {});
    };

    // Configuración de idioma español
    if (!window.flatpickr.l10n) {
        window.flatpickr.l10n = {};
    }
    
    window.flatpickr.l10n.es = {
        weekdays: {
            shorthand: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
            longhand: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
        },
        months: {
            shorthand: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            longhand: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
        },
        firstDayOfWeek: 1,
        ordinal: function(nth) {
            var s = nth % 100;
            if (s > 3 && s < 21) return 'º';
            switch (s % 10) {
                case 1: return 'º';
                case 2: return 'º';
                case 3: return 'º';
                default: return 'º';
            }
        }
    };

})();
