# Generated by Django 5.0.6 on 2024-06-22 15:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('APIApp', '0010_alter_task_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='priority',
            field=models.CharField(default='low', max_length=6),
        ),
    ]