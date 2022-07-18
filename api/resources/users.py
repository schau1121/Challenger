from flask_restful import Resource, reqparse
from models.users import StudentUserModel, CompanyUserModel


class StudentUser(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("starred_challenge_id_add", type=str)
    parser.add_argument("starred_challenge_id_remove", type=str)
    parser.add_argument("email", type=str)

    def get(self, username):
        user = StudentUserModel.find_by_username(username)
        if user:
            return user.json()
        else:
            return {
                "message": "User not found"
            }, 404

    def put(self, username):
        data = StudentUser.parser.parse_args()
        user = StudentUserModel.find_by_username(username)
        if user:
            if data["starred_challenge_id_add"] != None:
                user.starred_challenge_ids.append(
                    data["starred_challenge_id_add"])
            if data["starred_challenge_id_remove"] != None:
                user.starred_challenge_ids.remove(
                    data["starred_challenge_id_remove"])
            if data["email"] != None:
                user.email = data["email"]

            user.save_to_db()

            return {
                "message": "Sucess!"
            }
        else:
            return {
                "message": "User not found"
            }, 404


class CompanyUser(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("company_name", type=str)
    parser.add_argument("company_description", type=str)

    def get(self, company_name):
        company = CompanyUserModel.find_by_company_name(company_name)
        if company:
            return company.json()
        else:
            return {
                "message": "Company not found"
            }, 404

    def put(self, company_name):
        data = CompanyUser.parser.parse_args()
        company = CompanyUserModel.find_by_company_name(company_name)
        if company:
            if data["company_name"] != "":
                company.company_name = data["company_name"]
            if data["company_description"] != "":
                company.company_description = data["company_description"]

            company.save_to_db()
        else:
            return {
                "message": "Company not found"
            }, 404


class UserRegister(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("username", type=str, required=True)
    parser.add_argument("password", type=str, required=True)
    parser.add_argument("role", type=str, required=True)
    parser.add_argument("company_name", type=str, required=True)
    parser.add_argument("company_description", type=str)
    parser.add_argument("email", type=str)

    def post(self):
        data = UserRegister.parser.parse_args()
        if StudentUserModel.find_by_username(data["username"]) or CompanyUserModel.find_by_company_name(data["company_name"]):
            return {"message": "A user with that username already exists!"}

        if data["role"] == "student":
            user = StudentUserModel(
                data["username"], data["password"], data["email"])
            user.save_to_db()
        else:
            user = CompanyUserModel(
                data["username"], data["password"], data["company_name"], data["company_description"])
            user.save_to_db()

        return {"message": "User created successfully!"}, 201
