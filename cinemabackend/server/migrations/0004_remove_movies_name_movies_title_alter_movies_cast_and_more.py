# Generated by Django 4.2.5 on 2023-10-26 01:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0003_rename_id_movies_mid'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='movies',
            name='name',
        ),
        migrations.AddField(
            model_name='movies',
            name='title',
            field=models.CharField(db_column='title', default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='movies',
            name='cast',
            field=models.CharField(db_column='cast', default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='movies',
            name='category',
            field=models.CharField(db_column='category', default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='movies',
            name='director',
            field=models.CharField(db_column='director', default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='movies',
            name='mid',
            field=models.IntegerField(db_column='mid', primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='movies',
            name='producer',
            field=models.CharField(db_column='producer', default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='movies',
            name='rating',
            field=models.CharField(db_column='rating', default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='movies',
            name='reviews',
            field=models.CharField(db_column='reviews', default='', max_length=1027),
        ),
        migrations.AlterField(
            model_name='movies',
            name='synopsis',
            field=models.CharField(db_column='synopsis', default='', max_length=1027),
        ),
        migrations.AlterField(
            model_name='movies',
            name='trailer',
            field=models.CharField(db_column='trailer', default='', max_length=1027),
        ),
    ]
