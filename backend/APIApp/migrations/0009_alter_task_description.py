# Generated by Django 5.0.6 on 2024-06-22 14:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('APIApp', '0008_alter_task_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='description',
            field=models.TextField(blank=True),
        ),
    ]
