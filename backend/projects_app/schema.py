import graphene
from graphene_django.types import DjangoObjectType
from .models import Projects
from users_app.models import ExtendUser
from django.contrib.auth import get_user_model
from graphql_jwt.decorators import login_required

class UserType(DjangoObjectType):
    class Meta:
        model = ExtendUser
        fields = '__all__'
        
class ProjectType(DjangoObjectType):
    class Meta:
        model = Projects
        fields = ('id', 'name', 'text_data', 'user')

    user = graphene.Field(UserType)

    def resolve_user(self, info):
        return self.user 

class CreateProjectMutation(graphene.Mutation):

    project = graphene.Field(ProjectType)

    @login_required
    def mutate(self, info):
        user = get_user_model().objects.get(pk=info.context.user.id)
        # user = info.context.user
        number = Projects.objects.filter(user=user).count() + 1
        project = Projects.objects.create(user=user, name=f'Untitled Project {number}', text_data='')
        return CreateProjectMutation(project=project)
    

class UpdateProjectMutation(graphene.Mutation):
    class Arguments:
        project_id = graphene.Int(required=True)
        text_data = graphene.String(required=True)

    project = graphene.Field(ProjectType)

    @login_required
    def mutate(self, info, project_id, text_data):
        project = Projects.objects.get(pk=project_id, user=info.context.user)
        project.text_data = text_data
        project.save()
        return UpdateProjectMutation(project=project)

class ProjectsQueries(graphene.ObjectType):
    projects = graphene.List(ProjectType)
    project = graphene.Field(ProjectType, id=graphene.Int(required=True))
    
    @login_required
    def resolve_projects(self, info):
        print(info.context.user.username)
        return Projects.objects.filter(user=info.context.user)
    
    @login_required
    def resolve_project(self, info, id):
        return Projects.objects.get(pk=id, user=info.context.user)

class ProjectMutations(graphene.ObjectType):
    create_project = CreateProjectMutation.Field()
    update_project = UpdateProjectMutation.Field()

