/**
 * AdvancedToast - Professional Toast Notification Library
 * @version 1.0.0
 * @author Your Name
 * @license MIT
 */

class AdvancedToast {
    constructor(globalOptions = {}) {
        this.containers = {};
        this.toastCounter = 0;
        this.activeToasts = new Map();
        
        // Default options that can be overridden
        this.defaultOptions = {
            type: 'info',
            title: '',
            message: '',
            duration: 3000,
            position: 'top-right',
            animation: 'slide',
            showProgress: true,
            pauseOnHover: true,
            closeOnClick: false,
            showCloseButton: true,
            rtl: false,
            customClass: '',
            icon: null, // Custom icon HTML or FontAwesome class
            onClick: null,
            onClose: null,
            ...globalOptions
        };

        // Initialize styles
        this.injectStyles();
    }

    /**
     * Inject required CSS styles into the document
     */
    injectStyles() {
        if (document.getElementById('advanced-toast-styles')) return;

        const styles = `
            .toast-container {
                position: fixed;
                z-index: 999999;
                pointer-events: none;
                display: flex;
                flex-direction: column;
                gap: 12px;
            }

            .toast-container.top-right { top: 20px; right: 20px; }
            .toast-container.top-left { top: 20px; left: 20px; }
            .toast-container.bottom-right { bottom: 20px; right: 20px; flex-direction: column-reverse; }
            .toast-container.bottom-left { bottom: 20px; left: 20px; flex-direction: column-reverse; }
            .toast-container.top-center { top: 20px; left: 50%; transform: translateX(-50%); }
            .toast-container.bottom-center { bottom: 20px; left: 50%; transform: translateX(-50%); flex-direction: column-reverse; }

            .advanced-toast {
                min-width: 300px;
                max-width: 400px;
                background: white;
                padding: 16px 20px;
                border-radius: 12px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
                display: flex;
                align-items: center;
                gap: 14px;
                opacity: 0;
                pointer-events: auto;
                position: relative;
                overflow: hidden;
                border-left: 4px solid;
                transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            }

            .advanced-toast.rtl {
                direction: rtl;
                border-left: none;
                border-right: 4px solid;
            }

            /* Toast Types */
            .advanced-toast.success {
                background: linear-gradient(135deg, rgba(17, 153, 142, 0.1), rgba(56, 239, 125, 0.1));
                border-left-color: #38ef7d;
            }

            .advanced-toast.rtl.success { border-right-color: #38ef7d; }

            .advanced-toast.error {
                background: linear-gradient(135deg, rgba(235, 51, 73, 0.1), rgba(244, 92, 67, 0.1));
                border-left-color: #f45c43;
            }

            .advanced-toast.rtl.error { border-right-color: #f45c43; }

            .advanced-toast.warning {
                background: linear-gradient(135deg, rgba(240, 147, 251, 0.1), rgba(245, 87, 108, 0.1));
                border-left-color: #f5576c;
            }

            .advanced-toast.rtl.warning { border-right-color: #f5576c; }

            .advanced-toast.info {
                background: linear-gradient(135deg, rgba(79, 172, 254, 0.1), rgba(0, 242, 254, 0.1));
                border-left-color: #00f2fe;
            }

            .advanced-toast.rtl.info { border-right-color: #00f2fe; }

            /* Animations */
            .advanced-toast.slide-right { transform: translateX(120%); }
            .advanced-toast.slide-left { transform: translateX(-120%); }
            .advanced-toast.fade { transform: scale(0.8); }
            .advanced-toast.bounce { transform: translateY(-100px); }
            .advanced-toast.zoom { transform: scale(0); }

            .advanced-toast.show {
                opacity: 1;
                transform: translateX(0) translateY(0) scale(1);
            }

            .toast-icon-wrapper {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                flex-shrink: 0;
            }

            .advanced-toast.success .toast-icon-wrapper { background: #38ef7d; color: white; }
            .advanced-toast.error .toast-icon-wrapper { background: #f45c43; color: white; }
            .advanced-toast.warning .toast-icon-wrapper { background: #f5576c; color: white; }
            .advanced-toast.info .toast-icon-wrapper { background: #00f2fe; color: white; }

            .toast-content {
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 4px;
                min-width: 0;
            }

            .toast-title {
                font-weight: 700;
                font-size: 15px;
                color: #333;
                word-wrap: break-word;
            }

            .toast-message {
                font-size: 13px;
                color: #666;
                line-height: 1.4;
                word-wrap: break-word;
            }

            .toast-close {
                width: 24px;
                height: 24px;
                border-radius: 50%;
                background: rgba(0, 0, 0, 0.05);
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s;
                flex-shrink: 0;
                border: none;
                padding: 0;
            }

            .toast-close:hover {
                background: rgba(0, 0, 0, 0.1);
                transform: rotate(90deg);
            }

            .toast-close::before {
                content: '×';
                font-size: 20px;
                color: #666;
                line-height: 1;
            }

            .toast-progress {
                position: absolute;
                bottom: 0;
                left: 0;
                height: 3px;
                width: 100%;
                transform-origin: left;
                animation: progressShrink linear forwards;
            }

            .advanced-toast.rtl .toast-progress {
                left: auto;
                right: 0;
                transform-origin: right;
            }

            .advanced-toast.success .toast-progress { background: #38ef7d; }
            .advanced-toast.error .toast-progress { background: #f45c43; }
            .advanced-toast.warning .toast-progress { background: #f5576c; }
            .advanced-toast.info .toast-progress { background: #00f2fe; }

            @keyframes progressShrink {
                from { transform: scaleX(1); }
                to { transform: scaleX(0); }
            }

            /* Responsive */
            @media (max-width: 500px) {
                .advanced-toast {
                    min-width: calc(100vw - 40px);
                    max-width: calc(100vw - 40px);
                }
                
                .toast-container.top-center,
                .toast-container.bottom-center {
                    left: 20px;
                    right: 20px;
                    transform: none;
                }
            }

            /* Dark Theme Support */
            @media (prefers-color-scheme: dark) {
                .advanced-toast {
                    background: #2d2d2d;
                }
                
                .toast-title { color: #fff; }
                .toast-message { color: #ccc; }
                .toast-close::before { color: #999; }
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.id = 'advanced-toast-styles';
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    /**
     * Get or create container for specific position
     */
    getContainer(position) {
        if (!this.containers[position]) {
            const container = document.createElement('div');
            container.className = `toast-container ${position}`;
            document.body.appendChild(container);
            this.containers[position] = container;
        }
        return this.containers[position];
    }

    /**
     * Get default icon for toast type
     */
    getDefaultIcon(type) {
        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };
        return icons[type] || icons.info;
    }

    /**
     * Get default title for toast type
     */
    getDefaultTitle(type, rtl = false) {
        const titlesEn = {
            success: 'Success',
            error: 'Error',
            warning: 'Warning',
            info: 'Info'
        };
        
        const titlesAr = {
            success: 'نجاح',
            error: 'خطأ',
            warning: 'تحذير',
            info: 'معلومة'
        };
        
        return rtl ? titlesAr[type] : titlesEn[type];
    }

    /**
     * Main show method - displays a toast notification
     */
    show(options = {}) {
        const opts = { ...this.defaultOptions, ...options };
        const container = this.getContainer(opts.position);
        const toastId = ++this.toastCounter;
        
        // Create toast element
        const toast = document.createElement('div');
        const animClass = this.getAnimationClass(opts.animation, opts.position);
        
        toast.className = `advanced-toast ${opts.type} ${animClass} ${opts.rtl ? 'rtl' : ''} ${opts.customClass}`;
        toast.setAttribute('data-toast-id', toastId);
        
        // Prepare title
        const title = opts.title || this.getDefaultTitle(opts.type, opts.rtl);
        
        // Prepare icon
        let iconHtml = '';
        if (opts.icon) {
            // Custom icon provided
            if (opts.icon.startsWith('fa-') || opts.icon.startsWith('fas ')) {
                iconHtml = `<i class="${opts.icon}"></i>`;
            } else {
                iconHtml = opts.icon;
            }
        } else {
            iconHtml = this.getDefaultIcon(opts.type);
        }
        
        // Build toast HTML
        toast.innerHTML = `
            <div class="toast-icon-wrapper">
                ${iconHtml}
            </div>
            <div class="toast-content">
                <div class="toast-title">${this.escapeHtml(title)}</div>
                ${opts.message ? `<div class="toast-message">${this.escapeHtml(opts.message)}</div>` : ''}
            </div>
            ${opts.showCloseButton ? '<button class="toast-close" aria-label="Close"></button>' : ''}
            ${opts.showProgress ? `<div class="toast-progress" style="animation-duration: ${opts.duration}ms;"></div>` : ''}
        `;

        // Add to container
        container.appendChild(toast);

        // Toast state
        let timeoutId;
        let startTime;
        let remainingTime = opts.duration;
        let isPaused = false;

        // Remove toast function
        const removeToast = () => {
            toast.classList.remove('show');
            
            setTimeout(() => {
                toast.remove();
                this.activeToasts.delete(toastId);
                
                // Remove container if empty
                if (container.children.length === 0) {
                    container.remove();
                    delete this.containers[opts.position];
                }
                
                // Call onClose callback
                if (opts.onClose) {
                    opts.onClose(toastId);
                }
            }, 400);
        };

        // Start timeout
        const startTimeout = () => {
            startTime = Date.now();
            timeoutId = setTimeout(removeToast, remainingTime);
        };

        // Pause timeout
        const pauseTimeout = () => {
            if (!isPaused && timeoutId) {
                clearTimeout(timeoutId);
                remainingTime -= Date.now() - startTime;
                isPaused = true;
                
                const progress = toast.querySelector('.toast-progress');
                if (progress) {
                    progress.style.animationPlayState = 'paused';
                }
            }
        };

        // Resume timeout
        const resumeTimeout = () => {
            if (isPaused) {
                isPaused = false;
                startTimeout();
                
                const progress = toast.querySelector('.toast-progress');
                if (progress) {
                    progress.style.animationPlayState = 'running';
                }
            }
        };

        // Show toast with animation
        requestAnimationFrame(() => {
            toast.classList.add('show');
            if (opts.duration > 0) {
                startTimeout();
            }
        });

        // Pause on hover
        if (opts.pauseOnHover && opts.duration > 0) {
            toast.addEventListener('mouseenter', pauseTimeout);
            toast.addEventListener('mouseleave', resumeTimeout);
        }

        // Close button
        if (opts.showCloseButton) {
            const closeBtn = toast.querySelector('.toast-close');
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                clearTimeout(timeoutId);
                removeToast();
            });
        }

        // Click handler
        if (opts.closeOnClick || opts.onClick) {
            toast.addEventListener('click', (e) => {
                if (e.target.classList.contains('toast-close')) return;
                
                if (opts.onClick) {
                    opts.onClick(toastId);
                }
                
                if (opts.closeOnClick) {
                    clearTimeout(timeoutId);
                    removeToast();
                }
            });
        }

        // Store active toast
        this.activeToasts.set(toastId, {
            element: toast,
            remove: removeToast,
            pause: pauseTimeout,
            resume: resumeTimeout
        });

        return toastId;
    }

    /**
     * Get animation class based on type and position
     */
    getAnimationClass(animation, position) {
        if (animation === 'slide') {
            return position.includes('left') ? 'slide-left' : 'slide-right';
        }
        return animation;
    }

    /**
     * Escape HTML to prevent XSS
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Success notification shortcut
     */
    success(message, options = {}) {
        return this.show({ 
            ...options, 
            type: 'success', 
            message 
        });
    }

    /**
     * Error notification shortcut
     */
    error(message, options = {}) {
        return this.show({ 
            ...options, 
            type: 'error', 
            message 
        });
    }

    /**
     * Warning notification shortcut
     */
    warning(message, options = {}) {
        return this.show({ 
            ...options, 
            type: 'warning', 
            message 
        });
    }

    /**
     * Info notification shortcut
     */
    info(message, options = {}) {
        return this.show({ 
            ...options, 
            type: 'info', 
            message 
        });
    }

    /**
     * Close a specific toast by ID
     */
    close(toastId) {
        const toast = this.activeToasts.get(toastId);
        if (toast) {
            toast.remove();
        }
    }

    /**
     * Close all active toasts
     */
    closeAll() {
        this.activeToasts.forEach(toast => toast.remove());
    }

    /**
     * Pause a specific toast
     */
    pause(toastId) {
        const toast = this.activeToasts.get(toastId);
        if (toast) {
            toast.pause();
        }
    }

    /**
     * Resume a specific toast
     */
    resume(toastId) {
        const toast = this.activeToasts.get(toastId);
        if (toast) {
            toast.resume();
        }
    }

    /**
     * Update default options
     */
    setDefaults(options) {
        this.defaultOptions = { ...this.defaultOptions, ...options };
    }

    /**
     * Destroy the toast system
     */
    destroy() {
        this.closeAll();
        
        // Remove all containers
        Object.values(this.containers).forEach(container => container.remove());
        this.containers = {};
        
        // Remove styles
        const styleSheet = document.getElementById('advanced-toast-styles');
        if (styleSheet) {
            styleSheet.remove();
        }
    }
}

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdvancedToast;
}

if (typeof define === 'function' && define.amd) {
    define([], function() {
        return AdvancedToast;
    });
}

// Global export for browser
if (typeof window !== 'undefined') {
    window.AdvancedToast = AdvancedToast;
}

/* 
==============================================
USAGE EXAMPLES:
==============================================

// 1. Basic Usage
const toast = new AdvancedToast();
toast.success('Operation successful!');
toast.error('Something went wrong!');
toast.warning('Please check your input');
toast.info('This is an information');

// 2. With Custom Options
toast.show({
    type: 'success',
    title: 'Custom Title',
    message: 'Custom message here',
    position: 'top-right',
    duration: 5000,
    animation: 'slide',
    showProgress: true
});

// 3. RTL Support (Arabic/Hebrew)
const toastAr = new AdvancedToast({ rtl: true });
toastAr.success('تمت العملية بنجاح!');

// 4. Custom Icons (FontAwesome)
toast.info('New message', {
    icon: 'fas fa-envelope'
});

// 5. With Callbacks
toast.success('Saved!', {
    onClick: (id) => console.log('Toast clicked:', id),
    onClose: (id) => console.log('Toast closed:', id)
});

// 6. Control Toasts
const id = toast.info('Processing...', { duration: 0 }); // No auto-close
toast.close(id); // Close specific toast
toast.closeAll(); // Close all toasts

// 7. Set Global Defaults
toast.setDefaults({
    position: 'bottom-right',
    duration: 4000,
    rtl: true
});

// 8. All Available Options
toast.show({
    type: 'success',           // 'success', 'error', 'warning', 'info'
    title: 'Title',            // Custom title
    message: 'Message',        // Toast message
    duration: 3000,            // Duration in ms (0 = no auto-close)
    position: 'top-right',     // 'top-right', 'top-left', 'bottom-right', 
                               // 'bottom-left', 'top-center', 'bottom-center'
    animation: 'slide',        // 'slide', 'fade', 'bounce', 'zoom'
    showProgress: true,        // Show progress bar
    pauseOnHover: true,        // Pause on mouse hover
    closeOnClick: false,       // Close when clicked
    showCloseButton: true,     // Show close button
    rtl: false,                // Right-to-left support
    customClass: 'my-class',   // Add custom CSS class
    icon: null,                // Custom icon HTML or FontAwesome class
    onClick: null,             // Click callback function
    onClose: null              // Close callback function
});
*/