# Generated by Django 4.2.5 on 2023-11-09 21:19

from django.conf import settings
import django.contrib.auth.models
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('uid', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('type_id', models.IntegerField(db_column='type_id', default='1')),
                ('email', models.EmailField(db_column='email', default='', max_length=255, unique=True)),
                ('password', models.CharField(db_column='user_password', default='', max_length=255)),
                ('first_name', models.CharField(db_column='first_name', default='', max_length=255)),
                ('last_name', models.CharField(db_column='last_name', default='', max_length=255)),
                ('username', models.CharField(default='nothing', max_length=255, unique=True)),
                ('phone_number', models.IntegerField(db_column='phone_number')),
                ('state_id', models.IntegerField(db_column='state_id', default='')),
                ('verification_code', models.IntegerField(db_column='verification_code', default='')),
                ('promotions', models.IntegerField(db_column='promotions', default=0)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'db_table': 'users',
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Movies',
            fields=[
                ('mid', models.IntegerField(db_column='mid', primary_key=True, serialize=False)),
                ('category', models.CharField(db_column='category', default='', max_length=255)),
                ('cast', models.CharField(db_column='cast', default='', max_length=255)),
                ('director', models.CharField(db_column='director', default='', max_length=255)),
                ('producer', models.CharField(db_column='producer', default='', max_length=255)),
                ('synopsis', models.CharField(db_column='synopsis', default='', max_length=1027)),
                ('reviews', models.CharField(db_column='reviews', default='', max_length=1027)),
                ('trailer', models.CharField(db_column='trailer', default='', max_length=1027)),
                ('rating', models.CharField(db_column='rating', default='', max_length=255)),
                ('title', models.CharField(db_column='title', default='', max_length=255)),
                ('poster_path', models.CharField(db_column='image', default='', max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Card',
            fields=[
                ('cid', models.BigAutoField(auto_created=True, db_column='cid', primary_key=True, serialize=False)),
                ('card_type', models.CharField(db_column='card_type', default='', max_length=255)),
                ('card_number', models.CharField(db_column='card_number', default='', max_length=255)),
                ('card_expiration', models.CharField(db_column='card_expiration', default='', max_length=255)),
                ('card_street', models.CharField(db_column='card_street', default='', max_length=255)),
                ('card_city', models.CharField(db_column='card_city', default='', max_length=255)),
                ('card_state', models.CharField(db_column='card_state', default='', max_length=255)),
                ('card_zip', models.CharField(db_column='card_zip', default='', max_length=255)),
                ('user_id', models.ForeignKey(db_column='user_id', on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'cards',
            },
        ),
    ]
