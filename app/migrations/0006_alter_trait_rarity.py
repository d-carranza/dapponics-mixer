# Generated by Django 4.1.1 on 2022-12-05 06:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0005_alter_trait_img_alter_trait_rarity_alter_trait_type_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='trait',
            name='rarity',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
