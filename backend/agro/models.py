from django.db import models
from django.conf import settings
import datetime

# Create your models here.
class LeafDisease(models.Model):
    _id = models.AutoField(primary_key=True)
    label = models.CharField(max_length=255, blank=False)
    photo = models.ImageField(upload_to="prediction_images", blank=False)
    created_At = models.DateField(default=datetime.date.today)
    modified = models.BooleanField(default=False)

    def delete(self, *args, **kwargs):
        self.photo.delete()
        super().delete(*args, **kwargs)
        
class CassavaLeafDisease(models.Model):
    _id = models.AutoField(primary_key=True)
    photo = models.ImageField(upload_to='uploads', blank=False)
    
class LeafDataset(models.Model):
    _id = models.AutoField(primary_key=True)
    label = models.CharField(max_length=255, blank=False)
    leafType = models.CharField(max_length=255, blank=False)
    details = models.TextField(blank=True)
    symptoms = models.TextField(blank=True)
    causes = models.TextField(blank=True)
    effects = models.TextField(blank=True)
    management = models.TextField(blank=True)
    image = models.ImageField(upload_to='uploads', blank=False)
    
    def __str__(self):
        return self.label
    def delete(self, *args, **kwargs):
        self.image.delete()
        super().delete(*args, **kwargs)
        





# class MultipleImages(models.Model):
#     leaf = models.ForeignKey(LeafDataset,on_delete=models.CASCADE, default=None, null=True, related_name = 'leaf_media', related_query_name = 'leaf_media')
#     image = models.ImageField(upload_to='uploads', blank=True)

#     def __str__(self):
#         return f'{self.id} Media'
