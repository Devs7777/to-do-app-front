# Task Manager Application

A responsive and user-friendly Task Manager application built with **Ionic** and **Angular**. This application allows users to manage categories and tasks efficiently, offering comprehensive functionality for personal task organization.

## 🌟 Features

### Category Management
- Create, edit, and delete task categories
- Intuitive category management interface
- Filter tasks by selected categories

### Task Management
- Add tasks to specific categories
- Mark tasks as completed or pending
- Delete individual tasks
- Comprehensive task tracking

### User Experience
- **Responsive Design:** Fully optimized for desktop and mobile devices
- **Custom SVG Icons:** Visual indicators for task completion status
- Clean and intuitive user interface

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 14.x or higher)
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation:
    ```bash
    node --version
    npm --version
    ```

- **Angular CLI** (global installation)
  ```bash
  npm install -g @angular/cli
  ```

- **Ionic CLI** (global installation)
  ```bash
  npm install -g @ionic/cli
  ```

## 🚀 Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/jlio215/to-do-app-front.git
   cd task-manager-app
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

## 🖥️ Development

### Running the Application

#### Ionic Development Server
```bash
ionic serve
```
- Accessible at: `http://localhost:8100/`
- Supports live reloading

#### Angular Development Server
```bash
ng serve
```
- Accessible at: `http://localhost:4200/`

## 🏗️ Building for Production

### Build Project
```bash
# Using Angular CLI
ng build --prod

# Using Ionic CLI
ionic build --prod
```
- Production files will be generated in the `www` directory

### Deployment Options
- Firebase Hosting
- Netlify
- GitHub Pages
- Any static site hosting service

## 🧪 Testing

### Unit Testing
```bash
ng test
```
- Runs tests using Karma test runner

### End-to-End (E2E) Testing
```bash
ng e2e
```
- Executes E2E tests using Protractor

## 🤝 Contributing

1. **Fork the Repository**
2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: describe your feature"
   ```
4. **Push to Branch**
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open a Pull Request**


## 📄 License

This project is licensed under the MIT License.

## 🔗 Related Projects
- [Ionic Framework](https://ionicframework.com/)
- [Angular](https://angular.io/)