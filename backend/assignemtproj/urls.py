from django.contrib import admin
from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from graphql_jwt.decorators import jwt_cookie

from graphene_django.views import GraphQLView

urlpatterns = [
    path('admin/', admin.site.urls),
    path("graphql", jwt_cookie(csrf_exempt(GraphQLView.as_view(graphiql=True)))),
]