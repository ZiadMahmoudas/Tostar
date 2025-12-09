# 🎉 Ziko Toaster

Professional toast notification library with **zero dependencies**, RTL support, smooth animations, and modern design.

[![npm version](https://img.shields.io/npm/v/ziko-toaster.svg)](https://www.npmjs.com/package/ziko-toaster)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Downloads](https://img.shields.io/npm/dm/ziko-toaster.svg)](https://www.npmjs.com/package/ziko-toaster)

## ✨ Features

- 🚀 **Zero Dependencies** - Pure vanilla JavaScript
- 🎨 **Beautiful Design** - Modern, clean UI with gradient backgrounds
- 🌍 **RTL Support** - Perfect for Arabic, Hebrew, and other RTL languages
- 📱 **Fully Responsive** - Works great on all screen sizes
- 🎭 **Multiple Animations** - Slide, fade, bounce, zoom
- ⚙️ **Highly Customizable** - Extensive options for every use case
- 🌙 **Dark Mode** - Automatic dark theme support
- 📦 **Tiny Size** - Only ~8KB minified
- ⏸️ **Pause on Hover** - Automatic pause when hovering
- 🎯 **Click to Close** - Optional close on click

## 📦 Installation

### NPM
```bash
npm install ziko-toaster
```

### CDN
```html
<!-- Styling -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ziko-toaster@latest/dist/toast.min.css">
<!-- unpkg -->
<script src="https://unpkg.com/ziko-toaster@latest/dist/toast.min.js"></script>
<!-- jsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/ziko-toaster@latest/dist/toast.min.js"></script>
```

## 🚀 Quick Start

### Basic Usage (English)
```javascript
// Create instance
const toast = new AdvancedToast();

// Show notifications
toast.success('Operation completed successfully!');
toast.error('Something went wrong!');
toast.warning('Please be careful!');
toast.info('Here is some useful information');
```

### RTL Support (Arabic/Hebrew)
```javascript
// Create RTL instance
const toast = new AdvancedToast({ rtl: true });

// Show Arabic notifications
toast.success('تمت العملية بنجاح!');
toast.error('حدث خطأ ما!');
toast.warning('يرجى الانتباه!');
toast.info('هذه معلومة مفيدة');
```

### HTML Usage (CDN)
```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>Ziko Toaster Example</title>
</head>
<body>
    <button onclick="showToast()">اضغط هنا</button>

    <!-- Include library -->
    <script src="https://unpkg.com/ziko-toaster@latest/dist/toast.min.js"></script>
    
    <script>
        // Initialize
        const toast = new AdvancedToast({ rtl: true });
        
        function showToast() {
            toast.success('تم الحفظ بنجاح! 🎉');
        }
    </script>
</body>
</html>
```

## 📚 API Documentation

### Constructor Options

```javascript
const toast = new AdvancedToast({
    type: 'info',              // Default toast type: 'success' | 'error' | 'warning' | 'info'
    title: '',                 // Default title (auto-generated based on type if empty)
    message: '',               // Default message
    duration: 3000,            // Duration in milliseconds (0 = no auto-close)
    position: 'top-right',     // Position on screen
    animation: 'slide',        // Animation type
    showProgress: true,        // Show progress bar
    pauseOnHover: true,        // Pause timer on hover
    closeOnClick: false,       // Close toast when clicked
    showCloseButton: true,     // Show X close button
    rtl: false,                // Right-to-left mode (Arabic/Hebrew)
    customClass: '',           // Custom CSS class
    icon: null,                // Custom icon (HTML string or Font Awesome class)
    onClick: null,             // Click callback function(toastId)
    onClose: null              // Close callback function(toastId)
});
```

### Methods

#### `show(options)` - Main Method
Display a toast with custom options.
```javascript
const toastId = toast.show({
    type: 'success',
    title: 'Custom Title',
    message: 'Your custom message here',
    duration: 5000,
    position: 'bottom-center',
    animation: 'bounce'
});
```

#### Shortcut Methods
Quick methods for common toast types:

```javascript
// Success toast
const id1 = toast.success('Operation successful!', {
    title: 'Done!',
    duration: 4000
});

// Error toast
const id2 = toast.error('Something went wrong!', {
    title: 'Error',
    duration: 5000
});

// Warning toast
const id3 = toast.warning('Please check your input', {
    title: 'Warning'
});

// Info toast
const id4 = toast.info('New update available', {
    title: 'Information'
});
```

#### Control Methods

```javascript
// Close specific toast by ID
const id = toast.info('Processing...');
toast.close(id);

// Close all active toasts
toast.closeAll();

// Pause specific toast
toast.pause(id);

// Resume specific toast
toast.resume(id);

// Update default options
toast.setDefaults({
    position: 'bottom-right',
    duration: 4000,
    rtl: true
});

// Destroy toast system (cleanup)
toast.destroy();
```

## ⚙️ Configuration Options

### All Available Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `type` | `string` | `'info'` | Toast type: `'success'`, `'error'`, `'warning'`, `'info'` |
| `title` | `string` | Auto | Toast title (auto-generated if empty) |
| `message` | `string` | `''` | Toast message content |
| `duration` | `number` | `3000` | Duration in ms (0 = persistent, won't auto-close) |
| `position` | `string` | `'top-right'` | Position: `'top-right'`, `'top-left'`, `'top-center'`, `'bottom-right'`, `'bottom-left'`, `'bottom-center'` |
| `animation` | `string` | `'slide'` | Animation: `'slide'`, `'fade'`, `'bounce'`, `'zoom'` |
| `showProgress` | `boolean` | `true` | Show animated progress bar |
| `pauseOnHover` | `boolean` | `true` | Pause countdown on mouse hover |
| `closeOnClick` | `boolean` | `false` | Close toast when clicked anywhere |
| `showCloseButton` | `boolean` | `true` | Show X close button |
| `rtl` | `boolean` | `false` | Right-to-left text direction |
| `customClass` | `string` | `''` | Additional CSS class for styling |
| `icon` | `string\|null` | `null` | Custom icon (HTML or FontAwesome class) |
| `onClick` | `function\|null` | `null` | Callback when toast is clicked: `(toastId) => {}` |
| `onClose` | `function\|null` | `null` | Callback when toast closes: `(toastId) => {}` |

### Position Options

```
┌─────────────────────────────────┐
│  top-left    top-center  top-right  │
│                                 │
│                                 │
│                                 │
│ bottom-left bottom-center bottom-right │
└─────────────────────────────────┘
```

### Default Titles

#### English (`rtl: false`)
- Success: `"Success"`
- Error: `"Error"`
- Warning: `"Warning"`
- Info: `"Info"`

#### Arabic (`rtl: true`)
- Success: `"نجاح"`
- Error: `"خطأ"`
- Warning: `"تحذير"`
- Info: `"معلومة"`

## 🎨 Usage Examples

### Example 1: Simple Success Message
```javascript
const toast = new AdvancedToast();
toast.success('Data saved successfully!');
```

### Example 2: Custom Position & Duration
```javascript
toast.error('Connection failed!', {
    position: 'bottom-center',
    duration: 5000
});
```

### Example 3: With Custom Title
```javascript
toast.info('You have 5 new messages', {
    title: 'Notifications',
    duration: 4000
});
```

### Example 4: Custom Icon (FontAwesome)
Make sure you have FontAwesome loaded:
```javascript
toast.success('Profile updated', {
    icon: 'fas fa-user-check',
    title: 'Account'
});
```

### Example 5: Custom Icon (Emoji/HTML)
```javascript
toast.info('New features available!', {
    icon: '🚀',
    title: 'Update'
});
```

### Example 6: Click to Close
```javascript
toast.warning('Click me to dismiss', {
    closeOnClick: true,
    duration: 0  // Won't auto-close
});
```

### Example 7: With Callbacks
```javascript
const id = toast.success('File uploaded successfully', {
    onClick: (toastId) => {
        console.log('Toast clicked:', toastId);
        window.open('/files');
    },
    onClose: (toastId) => {
        console.log('Toast closed:', toastId);
        // Trigger next action
    }
});
```

### Example 8: Persistent Toast (Manual Close)
```javascript
// Show processing toast
const processingId = toast.info('Processing your request...', {
    duration: 0,  // Won't auto-close
    showProgress: false,
    showCloseButton: false
});

// Simulate API call
fetch('/api/data')
    .then(response => {
        toast.close(processingId);
        toast.success('Request completed!');
    })
    .catch(error => {
        toast.close(processingId);
        toast.error('Request failed!');
    });
```

### Example 9: Form Validation
```javascript
function validateForm() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (!email) {
        toast.error('Email is required', {
            title: 'Validation Error',
            position: 'top-center'
        });
        return false;
    }
    
    if (password.length < 6) {
        toast.warning('Password must be at least 6 characters', {
            title: 'Weak Password',
            duration: 5000
        });
        return false;
    }
    
    toast.success('Form is valid!', {
        title: 'Success'
    });
    return true;
}
```

### Example 10: Shopping Cart
```javascript
function addToCart(product) {
    // Add product logic...
    
    toast.success(`"${product.name}" added to cart`, {
        title: 'Cart Updated',
        icon: '🛒',
        position: 'bottom-right',
        duration: 2000,
        onClick: () => {
            window.location.href = '/cart';
        }
    });
}
```

### Example 11: Arabic/RTL Support
```javascript
const toastAr = new AdvancedToast({ rtl: true });

// Login success
toastAr.success('تم تسجيل الدخول بنجاح', {
    title: 'أهلاً بك',
    icon: '👋',
    duration: 3000
});

// Error message
toastAr.error('فشل الاتصال بالخادم', {
    title: 'خطأ',
    duration: 5000
});
```

### Example 12: Different Animations
```javascript
// Slide animation (default)
toast.success('Slide animation', { animation: 'slide' });

// Fade animation
toast.info('Fade animation', { animation: 'fade' });

// Bounce animation
toast.warning('Bounce animation', { animation: 'bounce' });

// Zoom animation
toast.error('Zoom animation', { animation: 'zoom' });
```

### Example 13: Set Global Defaults
```javascript
// Set once for all toasts
toast.setDefaults({
    position: 'bottom-right',
    duration: 4000,
    animation: 'bounce',
    showProgress: true
});

// All subsequent toasts will use these defaults
toast.success('Using default settings');
toast.error('Also using default settings');
```

### Example 14: Multiple Toast Instances
```javascript
// English toasts (top-right)
const toastEn = new AdvancedToast({
    position: 'top-right',
    rtl: false
});

// Arabic toasts (top-left)
const toastAr = new AdvancedToast({
    position: 'top-left',
    rtl: true
});

toastEn.success('Operation successful!');
toastAr.success('تمت العملية بنجاح!');
```

## 🎭 Animation Types

- **`slide`** - Smooth slide from the side (default)
- **`fade`** - Fade in/out with scale
- **`bounce`** - Bouncy entrance from top
- **`zoom`** - Scale in/out from center

## 🌐 Framework Integration

### React Example
```jsx
import { useEffect, useRef } from 'react';
import AdvancedToast from 'ziko-toaster';

function App() {
    const toastRef = useRef(null);

    useEffect(() => {
        toastRef.current = new AdvancedToast({ rtl: true });
        
        return () => {
            toastRef.current?.destroy();
        };
    }, []);

    const handleSave = () => {
        toastRef.current?.success('تم الحفظ بنجاح!');
    };

    return (
        <button onClick={handleSave}>Save</button>
    );
}
```

### Vue Example
```vue
<template>
    <button @click="showToast">Show Toast</button>
</template>

<script>
import AdvancedToast from 'ziko-toaster';

export default {
    data() {
        return {
            toast: null
        };
    },
    mounted() {
        this.toast = new AdvancedToast({ rtl: true });
    },
    methods: {
        showToast() {
            this.toast.success('تمت العملية بنجاح!');
        }
    },
    beforeUnmount() {
        this.toast?.destroy();
    }
};
</script>
```

## 🌍 Browser Support

- ✅ Chrome (last 2 versions)
- ✅ Firefox (last 2 versions)
- ✅ Safari (last 2 versions)
- ✅ Edge (last 2 versions)
- ✅ Opera (last 2 versions)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Troubleshooting

### Toast not showing?
```javascript
window.addEventListener('DOMContentLoaded', () => {
    const toast = new AdvancedToast();

    window.showToast = function() {
        toast.warning('تم الحفظ بنجاح! 🎉');
    }
});  // ✓ Correct
// Not this:
AdvancedToast.success('test'); // ✗ Wrong
```


### RTL not working?
```javascript
// Make sure rtl is set in constructor or options
const toast = new AdvancedToast({ rtl: true }); // ✓ Global

// Or per toast
toast.success('مرحبا', { rtl: true }); // ✓ Per toast
```

## 📝 License

MIT © Ziad Mahmoud

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Support

- 📫 Email: ziadbobo78@gmail.com

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

---

Made with ❤️ by [Ziad Mahmoud](https://github.com/ZiadMahmoudas)