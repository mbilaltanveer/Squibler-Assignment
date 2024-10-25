from django.contrib import admin
from projects_app.models import Projects
from django.apps import apps
# Register your models here.

app_config = apps.get_app_config('projects_app')

for model in app_config.get_models():
    admin.site.register(model)
