
# 📋 Kanban Task Board

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![jQuery](https://img.shields.io/badge/jquery-%230769AD.svg?style=for-the-badge&logo=jquery&logoColor=white)](https://jquery.com/)
[![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![Day.js](https://img.shields.io/badge/Day.js-orange?style=for-the-badge)](https://day.js.org/)

## 🚀 Overview
The **Kanban Task Board** is a project management tool designed for teams to organize work through a visual, interactive interface. This application demonstrates the integration of multiple third-party APIs to manage complex UI states, drag-and-drop interactions, and time-sensitive data visualization.



## 🛠️ Core Features
* **Persistent State:** Utilizes `localStorage` to ensure all tasks and progress remain intact after browser refreshes.
* **Intuitive Drag-and-Drop:** Built with **jQuery UI**, allowing users to update task status (To Do, In Progress, Done) by physically moving cards across swimlanes.
* **Deadline Intelligence:** Integrated with **Day.js** to provide automated color-coding:
    * 🟡 **Yellow:** Tasks due today or approaching deadline.
    * 🔴 **Red:** Overdue tasks requiring immediate attention.
* **Clean UI/UX:** Styled with **Bootstrap 5** and custom CSS for a modern, responsive user experience.

## 🧰 Technical Stack
* **Core:** HTML5, CSS3 (Inter Google Font)
* **Logic:** JavaScript (ES6+)
* **DOM Manipulation:** jQuery
* **Interactions:** jQuery UI
* **Date Handling:** Day.js
* **UI Framework:** Bootstrap 5

## 📸 Preview
![Task Board Screenshot](./assets/images/screenshot.png) 
*(Note: Don't forget to save a screenshot in your assets folder!)*

## 🚦 Deployment
The application is live and can be accessed here:  
**[👉 View Live Application](https://piotr-szyk.github.io/kanban-task-board/)**

## 📖 How to Use
1. Click the **"+ New Task"** button in the header.
2. Enter the task title, a detailed description, and a due date using the datepicker.
3. Drag the generated card to the appropriate lane as you progress.
4. Click **"Delete"** to permanently remove a task from the board and storage.

---
© 2026 Piotr Szyk. All Rights Reserved.
