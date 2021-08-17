from django.contrib import admin
from .models import LeafDataset

# Register your models to admin site, then you can add, edit, delete and search your models in Django admin site.
admin.site.register(LeafDataset)


# class MultipleImagesAdmin(admin.StackedInline):
#     model = MultipleImages

# @admin.register(LeafDataset)
# class LeafDatasetAdmin(admin.ModelAdmin):
#     inlines = [MultipleImagesAdmin]
    
#     class Meta:
#         model=LeafDataset

# @admin.register(MultipleImages)
# class MultipleImageAdmin(admin.ModelAdmin):
#     pass