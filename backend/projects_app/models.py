from django.db import models

# Create your models here.

class Projects(models.Model):
    user = models.ForeignKey('users_app.ExtendUser', on_delete=models.CASCADE, null=True, blank=True,related_name='NewSectionProject')
    name=models.CharField(max_length=264,null=True,blank=True)
    text_data=models.TextField(null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.name}'