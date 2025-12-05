   class AdvancedToast {
            constructor() {
                this.containers = {};
                this.defaultOptions = {
                    type: 'info',
                    title: '',
                    message: '',
                    duration: 3000,
                    position: 'top-right',
                    animation: 'slide',
                    showProgress: true,
                    pauseOnHover: true,
                    closeOnClick: true
                };
            }

            getContainer(position) {
                if (!this.containers[position]) {
                    const container = document.createElement('div');
                    container.className = `toast-container ${position}`;
                    document.body.appendChild(container);
                    this.containers[position] = container;
                }
                return this.containers[position];
            }

            getIcon(type) {
                const icons = {
                    success: 'fa-check-circle',
                    error: 'fa-times-circle',
                    warning: 'fa-exclamation-triangle',
                    info: 'fa-info-circle'
                };
                return icons[type] || icons.info;
            }

            getTitle(type) {
                const titles = {
                    success: 'نجاح!',
                    error: 'خطأ!',
                    warning: 'تحذير!',
                    info: 'معلومة'
                };
                return titles[type] || titles.info;
            }

            show(options) {
                const opts = { ...this.defaultOptions, ...options };
                const container = this.getContainer(opts.position);
                
                const toast = document.createElement('div');
                const animClass = opts.animation === 'slide' 
                    ? (opts.position.includes('left') ? 'slide-left' : 'slide-right')
                    : opts.animation;
                
                toast.className = `my-toast ${opts.type} ${animClass}`;
                
                const title = opts.title || this.getTitle(opts.type);
                
                toast.innerHTML = `
                    <div class="toast-icon-wrapper">
                        <i class="fas ${this.getIcon(opts.type)}"></i>
                    </div>
                    <div class="toast-content">
                        <div class="toast-title">${title}</div>
                        ${opts.message ? `<div class="toast-message">${opts.message}</div>` : ''}
                    </div>
                    <div class="toast-close">
                        <i class="fas fa-times"></i>
                    </div>
                    ${opts.showProgress ? `<div class="toast-progress" style="animation-duration: ${opts.duration}ms;"></div>` : ''}
                `;

                container.appendChild(toast);

                let timeoutId;
                let isPaused = false;

                const removeToast = () => {
                    toast.classList.remove('show');
                    setTimeout(() => {
                        toast.remove();
                        if (container.children.length === 0) {
                            container.remove();
                            delete this.containers[opts.position];
                        }
                    }, 400);
                };

                const startTimeout = () => {
                    timeoutId = setTimeout(removeToast, opts.duration);
                };

                requestAnimationFrame(() => {
                    toast.classList.add('show');
                    startTimeout();
                });

                if (opts.pauseOnHover) {
                    toast.addEventListener('mouseenter', () => {
                        if (!isPaused) {
                            clearTimeout(timeoutId);
                            isPaused = true;
                            const progress = toast.querySelector('.toast-progress');
                            if (progress) progress.style.animationPlayState = 'paused';
                        }
                    });

                    toast.addEventListener('mouseleave', () => {
                        if (isPaused) {
                            const progress = toast.querySelector('.toast-progress');
                            if (progress) {
                                const remaining = parseFloat(getComputedStyle(progress).width) / parseFloat(getComputedStyle(toast).width) * opts.duration;
                                clearTimeout(timeoutId);
                                timeoutId = setTimeout(removeToast, remaining);
                                progress.style.animationPlayState = 'running';
                            }
                            isPaused = false;
                        }
                    });
                }

                const closeBtn = toast.querySelector('.toast-close');
                closeBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    clearTimeout(timeoutId);
                    removeToast();
                });

                if (opts.closeOnClick) {
                    toast.addEventListener('click', () => {
                        clearTimeout(timeoutId);
                        removeToast();
                    });
                }

                return toast;
            }

            success(message, options = {}) {
                return this.show({ ...options, type: 'success', message });
            }

            error(message, options = {}) {
                return this.show({ ...options, type: 'error', message });
            }

            warning(message, options = {}) {
                return this.show({ ...options, type: 'warning', message });
            }

            info(message, options = {}) {
                return this.show({ ...options, type: 'info', message });
            }
        }

        const toast = new AdvancedToast();

        function showToast(type) {
            const messages = {
                success: 'This is Successfully',
                error: 'This is Error',
                warning: 'This is Warning',
                info: 'This is Info'
            };

            const options = {
                message: messages[type],
                position: document.getElementById('position').value,
                animation: document.getElementById('animation').value,
                duration: parseInt(document.getElementById('duration').value),
                showProgress: document.getElementById('showProgress').checked
            };

            toast[type](messages[type], options);
        }