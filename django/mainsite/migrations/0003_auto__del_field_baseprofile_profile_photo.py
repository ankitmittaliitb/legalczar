# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Deleting field 'BaseProfile.profile_photo'
        db.delete_column(u'mainsite_baseprofile', 'profile_photo')


    def backwards(self, orm):
        # Adding field 'BaseProfile.profile_photo'
        db.add_column(u'mainsite_baseprofile', 'profile_photo',
                      self.gf('django.db.models.fields.files.ImageField')(max_length=100, null=True, blank=True),
                      keep_default=False)


    models = {
        u'auth.group': {
            'Meta': {'object_name': 'Group'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '80'}),
            'permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'})
        },
        u'auth.permission': {
            'Meta': {'ordering': "(u'content_type__app_label', u'content_type__model', u'codename')", 'unique_together': "((u'content_type', u'codename'),)", 'object_name': 'Permission'},
            'codename': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'content_type': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['contenttypes.ContentType']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        u'auth.user': {
            'Meta': {'object_name': 'User'},
            'date_joined': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'email': ('django.db.models.fields.EmailField', [], {'max_length': '75', 'blank': 'True'}),
            'first_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'groups': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['auth.Group']", 'symmetrical': 'False', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_active': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'is_staff': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'is_superuser': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'last_login': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'last_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'password': ('django.db.models.fields.CharField', [], {'max_length': '128'}),
            'user_permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'}),
            'username': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '30'})
        },
        u'contenttypes.contenttype': {
            'Meta': {'ordering': "('name',)", 'unique_together': "(('app_label', 'model'),)", 'object_name': 'ContentType', 'db_table': "'django_content_type'"},
            'app_label': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'model': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '100'})
        },
        u'mainsite.baseprofile': {
            'Meta': {'object_name': 'BaseProfile'},
            'city': ('django.db.models.fields.CharField', [], {'max_length': '64', 'blank': 'True'}),
            'gender': ('django.db.models.fields.CharField', [], {'max_length': '1', 'null': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'landline': ('django.db.models.fields.CharField', [], {'max_length': '15', 'blank': 'True'}),
            'mobile': ('django.db.models.fields.CharField', [], {'max_length': '15', 'blank': 'True'}),
            'profile': ('django.db.models.fields.CharField', [], {'max_length': '10'}),
            'state': ('django.db.models.fields.CharField', [], {'max_length': '4', 'blank': 'True'}),
            'street_line1': ('django.db.models.fields.CharField', [], {'max_length': '128', 'blank': 'True'}),
            'street_line2': ('django.db.models.fields.CharField', [], {'max_length': '128', 'blank': 'True'}),
            'user': ('django.db.models.fields.related.OneToOneField', [], {'to': u"orm['auth.User']", 'unique': 'True'}),
            'zipcode': ('django.db.models.fields.CharField', [], {'max_length': '10', 'blank': 'True'})
        },
        u'mainsite.clientprofile': {
            'Meta': {'object_name': 'ClientProfile', '_ormbases': [u'mainsite.BaseProfile']},
            u'baseprofile_ptr': ('django.db.models.fields.related.OneToOneField', [], {'to': u"orm['mainsite.BaseProfile']", 'unique': 'True', 'primary_key': 'True'}),
            'interest_areas': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['mainsite.PracticeArea']", 'symmetrical': 'False', 'blank': 'True'})
        },
        u'mainsite.lawyerprofile': {
            'Meta': {'object_name': 'LawyerProfile', '_ormbases': [u'mainsite.BaseProfile']},
            'bar_id': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            u'baseprofile_ptr': ('django.db.models.fields.related.OneToOneField', [], {'to': u"orm['mainsite.BaseProfile']", 'unique': 'True', 'primary_key': 'True'}),
            'halfhour_fee': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'hourly_fee': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'practice_areas': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['mainsite.PracticeArea']", 'symmetrical': 'False', 'blank': 'True'}),
            'practice_court': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['mainsite.PracticeCourt']", 'symmetrical': 'False', 'blank': 'True'}),
            'professional_summary': ('tinymce.models.HTMLField', [], {'null': 'True', 'blank': 'True'}),
            'status': ('django.db.models.fields.CharField', [], {'default': "'AP'", 'max_length': '2'})
        },
        u'mainsite.practicearea': {
            'Meta': {'object_name': 'PracticeArea'},
            'area': ('django.db.models.fields.CharField', [], {'max_length': '250'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'})
        },
        u'mainsite.practicecourt': {
            'Meta': {'object_name': 'PracticeCourt'},
            'court': ('django.db.models.fields.CharField', [], {'max_length': '250'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'level': ('django.db.models.fields.CharField', [], {'max_length': '2'})
        },
        u'mainsite.review': {
            'Meta': {'object_name': 'Review'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'lawyer': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'reviews'", 'to': u"orm['auth.User']"}),
            'pub_date': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            'rating': ('django.db.models.fields.FloatField', [], {'default': '0'}),
            'review': ('tinymce.models.HTMLField', [], {'null': 'True', 'blank': 'True'}),
            'status': ('django.db.models.fields.CharField', [], {'default': "'WA'", 'max_length': '2'}),
            'subject': ('django.db.models.fields.CharField', [], {'max_length': '250'}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['auth.User']"})
        },
        u'mainsite.search': {
            'Meta': {'object_name': 'Search'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'ip': ('django.db.models.fields.CharField', [], {'max_length': '250', 'null': 'True', 'blank': 'True'}),
            'string': ('django.db.models.fields.CharField', [], {'max_length': '250'}),
            'when': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'})
        }
    }

    complete_apps = ['mainsite']