import graphene
from graphql_auth import mutations
from graphql_auth.schema import UserQuery, MeQuery
from projects_app.schema import ProjectsQueries, ProjectMutations

class AuthMutation(graphene.ObjectType):
   register = mutations.Register.Field()
   verify_account = mutations.VerifyAccount.Field()
   login = mutations.ObtainJSONWebToken.Field()

class Query(UserQuery, MeQuery, ProjectsQueries, graphene.ObjectType):
    pass

class Mutation(AuthMutation, ProjectMutations, graphene.ObjectType):
   pass

schema = graphene.Schema(query=Query, mutation=Mutation)