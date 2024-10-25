### Assignment
Built with Angular `CLI version 14.1.3` and `Djando 3.2`

## Angular (Frontend)

# Development Setup
Start Server: Run `ng serve`
Access App: Open `http://localhost:4200/` in your browser
Auto Reload: Any file changes will trigger automatic reload

# Code Generation
Quickly add new features:

- Component: `ng generate component <component-name>` or `ng g c <component-name>`
- Other: Replace `component` with directive, pipe, service, class, guard, interface, enum, or module for different elements

# Building the Project
- Build: Use `ng build` to compile
- Output: Files are saved in `dist/` directory\

# Testing
- Unit Tests: Run `ng test` (powered by Karma)
- End-to-End Tests: Run ng `e2e` (requires an end-to-end testing package)

# Further Resources
For additional commands and options, run `ng help` or check out the Angular CLI Documentation.

# login
You can login using `admin@admin.com` and password is `admin`





## Django (Backend)

# Prerequisites
- Python (3.9)
- Django (3.2)
- Virtual Environment (recommended)

# Initial Setup
Create and Activate a Virtual Environment:
- `python -m venv venv`
- `source venv/bin/activate`   #On Windows: `venv\Scripts\activate`

# Install Dependencies:
Install all dependencies using `pip install -r requirements.txt` to make sure no versioning error occurs

# Database Setup
Create migration files using command `python manage.py makemigrations` then migrate Database using command `python manage.py migrate`

# Running the Server
Start the Development Server:
- `py manage.py runserver 127.0.0.1:8002`
Access the App: Open `http://localhost:8002/` in your browser

# Creating New App Components
Generate a New App using `python manage.py startapp <app-name>`

# Testing
Run Unit Tests:
- `python manage.py test`