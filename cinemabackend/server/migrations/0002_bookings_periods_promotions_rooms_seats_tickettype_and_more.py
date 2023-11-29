# Generated by Django 4.2.5 on 2023-11-29 23:29

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Bookings',
            fields=[
                ('bid', models.IntegerField(db_column='bid', primary_key=True, serialize=False)),
                ('total', models.FloatField(db_column='total', default='')),
                ('card_id', models.ForeignKey(db_column='card_id', on_delete=django.db.models.deletion.DO_NOTHING, to='server.card')),
            ],
        ),
        migrations.CreateModel(
            name='Periods',
            fields=[
                ('pid', models.IntegerField(db_column='pid', primary_key=True, serialize=False)),
                ('start_time', models.TimeField(db_column='start_time')),
                ('end_time', models.TimeField(db_column='end_time')),
            ],
        ),
        migrations.CreateModel(
            name='Promotions',
            fields=[
                ('pmid', models.IntegerField(db_column='pmid', primary_key=True, serialize=False)),
                ('promotion_code', models.CharField(db_column='promotion_code', default='', max_length=255)),
                ('percent', models.FloatField(db_column='percent', default='')),
                ('start_date', models.DateField(db_column='start_date')),
                ('end_date', models.DateField(db_column='end_date')),
            ],
        ),
        migrations.CreateModel(
            name='Rooms',
            fields=[
                ('rid', models.IntegerField(db_column='rid', primary_key=True, serialize=False)),
                ('seatsInRoom', models.IntegerField(db_column='seats', default='')),
            ],
        ),
        migrations.CreateModel(
            name='Seats',
            fields=[
                ('sid', models.IntegerField(db_column='sid', primary_key=True, serialize=False)),
                ('seat_number', models.IntegerField(db_column='seat_number', default='')),
                ('available', models.IntegerField(db_column='available', default='')),
                ('room_id', models.ForeignKey(db_column='room_id', on_delete=django.db.models.deletion.DO_NOTHING, to='server.rooms')),
            ],
        ),
        migrations.CreateModel(
            name='TicketType',
            fields=[
                ('ttid', models.IntegerField(db_column='ttid', primary_key=True, serialize=False)),
                ('ticket_type', models.CharField(db_column='ticket_type', default='', max_length=255)),
                ('price', models.IntegerField(db_column='price', default='')),
            ],
        ),
        migrations.CreateModel(
            name='Tickets',
            fields=[
                ('tid', models.IntegerField(db_column='tid', primary_key=True, serialize=False)),
                ('booking_id', models.ForeignKey(db_column='booking_id', on_delete=django.db.models.deletion.DO_NOTHING, to='server.bookings')),
                ('seat_id', models.ForeignKey(db_column='seat_id', on_delete=django.db.models.deletion.DO_NOTHING, to='server.seats')),
                ('ticket_type_id', models.ForeignKey(db_column='ticket_type_id', on_delete=django.db.models.deletion.DO_NOTHING, to='server.tickettype')),
            ],
        ),
        migrations.CreateModel(
            name='Showings',
            fields=[
                ('shid', models.IntegerField(db_column='shid', primary_key=True, serialize=False)),
                ('movie_id', models.ForeignKey(db_column='movie_id', on_delete=django.db.models.deletion.DO_NOTHING, to='server.movies')),
                ('period_id', models.ForeignKey(db_column='period_id', on_delete=django.db.models.deletion.DO_NOTHING, to='server.periods')),
            ],
        ),
        migrations.AddField(
            model_name='bookings',
            name='promotion_id',
            field=models.ForeignKey(db_column='promotion_id', on_delete=django.db.models.deletion.DO_NOTHING, to='server.promotions'),
        ),
        migrations.AddField(
            model_name='bookings',
            name='showing_id',
            field=models.ForeignKey(db_column='showing_id', on_delete=django.db.models.deletion.DO_NOTHING, to='server.showings'),
        ),
        migrations.AddField(
            model_name='bookings',
            name='user_id',
            field=models.ForeignKey(db_column='user_id', on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL),
        ),
    ]
