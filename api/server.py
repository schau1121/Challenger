from re import S
from flask import Flask
from flask_restful import Api
from db import db

from resources.users import StudentUser, CompanyUser
from resources.challenge import Challenge, ChallengeList
from resources.submission import Submission

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
api = Api(app)


@app.before_first_request
def create_tables():
    db.create_all()


api.add_resource(StudentUser, "/api/students/user/<string:username>")
api.add_resource(CompanyUser, "/api/companies/user/<string:company_name>")
api.add_resource(Challenge, "/api/challenge/<int:challenge_id>")
api.add_resource(ChallengeList, "/api/challenges")
api.add_resource(Submission, "/api/submission/<int:submission_id>")

if __name__ == "__main__":
    db.init_app()
    app.run(port=5000, debug=True)
