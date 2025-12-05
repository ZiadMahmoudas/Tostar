# 🎉 Advanced Toast

Professional toast notification library with **zero dependencies**, RTL support, smooth animations, and modern design.

[![npm version](https://img.shields.io/npm/v/@yourusername/advanced-toast.svg)](https://www.npmjs.com/package/@yourusername/advanced-toast)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Downloads](https://img.shields.io/npm/dm/@yourusername/advanced-toast.svg)](https://www.npmjs.com/package/@yourusername/advanced-toast)

## ✨ Features

- 🚀 **Zero Dependencies** - Pure vanilla JavaScript
- 🎨 **Beautiful Design** - Modern, clean UI with smooth animations
- 🌍 **RTL Support** - Perfect for Arabic, Hebrew, and other RTL languages
- 📱 **Fully Responsive** - Works great on all screen sizes
- 🎭 **Multiple Animations** - Slide, fade, bounce, zoom
- ⚙️ **Highly Customizable** - Extensive options for every use case
- 🎯 **TypeScript Support** - Full type definitions included
- ♿ **Accessibility** - ARIA labels and keyboard support
- 🌙 **Dark Mode** - Automatic dark theme support
- 📦 **Tiny Size** - Only ~5KB minified

## 📦 Installation

### NPM
```bash
npm install @yourusername/advanced-toast
```

### Yarn
```bash
yarn add @yourusername/advanced-toast
```

### CDN
```html
<script src="https://cdn.jsdelivr.net/npm/@yourusername/advanced-toast/dist/toast.min.js"></script>
```

## 🚀 Quick Start

### Basic Usage
```javascript
// Create instance
const toast = new AdvancedToast();

// Show notifications
toast.success('Operation successful!');
toast.error('Something went wrong!');
toast.warning('Please check your input');
toast.info('This is information');
```

### Custom Options
```javascript
toast.show({
    type: 'success',
    title: 'Success!',
    message: 'Your data has been saved',
    position: 'top-right',
    duration: 5000,
    animation: 'slide',
    showProgress: true
});
```

### RTL Support (Arabic/Hebrew)
```javascript
const toast = new AdvancedToast({ rtl: true });
toast.success('تمت العملية بنجاح!');
toast.error('حدث خطأ ما!');
```

## 📚 API Documentation

### Constructor Options
```javascript
const toast = new AdvancedToast({
    type: 'info',              // Default toast type
    position: 'top-right',     // Default position
    duration: 3000,            // Default duration (ms)
    animation: 'slide',        // Default animation
    showProgress: true,        // Show progress bar
    pauseOnHover: true,        // Pause on hover
    closeOnClick: false,       // Close on click
    showCloseButton: true,     // Show close button
    rtl: false,                // RTL mode
    customClass: ''            // Custom CSS class
});
```

### Methods

#### `show(options)`
Display a toast with custom options.
```javascript
toast.show({
    type: 'success',
    title: 'Custom Title',
    message: 'Custom message',
    duration: 4000
});
```

#### Shortcut Methods
```javascript
toast.success(message, options)
toast.error(message, options)
toast.warning(message, options)
toast.info(message, options)
```

#### Control Methods
```javascript
const id = toast.info('Processing...', { duration: 0 });
toast.close(id);        // Close specific toast
toast.closeAll();       // Close all toasts
toast.pause(id);        // Pause specific toast
toast.resume(id);       // Resume specific toast
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `type` | string | `'info'` | Toast type: `success`, `error`, `warning`, `info` |
| `title` | string | Auto | Toast title |
| `message` | string | `''` | Toast message |
| `duration` | number | `3000` | Duration in ms (0 = no auto-close) |
| `position` | string | `'top-right'` | Position: `top-right`, `top-left`, `bottom-right`, `bottom-left`, `top-center`, `bottom-center` |
| `animation` | string | `'slide'` | Animation: `slide`, `fade`, `bounce`, `zoom` |
| `showProgress` | boolean | `true` | Show progress bar |
| `pauseOnHover` | boolean | `true` | Pause on mouse hover |
| `closeOnClick` | boolean | `false` | Close when clicked |
| `showCloseButton` | boolean | `true` | Show close button |
| `rtl` | boolean | `false` | Right-to-left mode |
| `customClass` | string | `''` | Custom CSS class |
| `icon` | string | Auto | Custom icon (HTML or FontAwesome class) |
| `onClick` | function | `null` | Click callback |
| `onClose` | function | `null` | Close callback |

## 🎨 Examples

### With Custom Icon (FontAwesome)
```javascript
toast.info('You have 5 new messages', {
    icon: 'fas fa-envelope',
    title: 'New Messages'
});
```

### With Callbacks
```javascript
toast.success('File uploaded', {
    onClick: (id) => {
        console.log('Toast clicked:', id);
    },
    onClose: (id) => {
        console.log('Toast closed:', id);
    }
});
```

### Persistent Toast (No Auto-Close)
```javascript
const id = toast.info('Processing your request...', {
    duration: 0,  // Won't auto-close
    showProgress: false
});

// Close it manually when done
setTimeout(() => toast.close(id), 5000);
```

### Set Global Defaults
```javascript
toast.setDefaults({
    position: 'bottom-right',
    duration: 4000,
    animation: 'bounce'
});
```

## 🎭 Animations

- **slide** - Smooth slide from side
- **fade** - Fade in/out
- **bounce** - Bouncy entrance
- **zoom** - Scale in/out

## 🌍 Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Opera (last 2 versions)

## 📝 License

MIT © [Your Name]

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🐛 Issues

Found a bug? Please [create an issue](https://github.com/yourusername/advanced-toast/issues)

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!