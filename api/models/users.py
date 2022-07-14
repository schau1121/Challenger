from click import password_option
from sqlalchemy import null
from db import db
from models.challenge import ChallengeModel
from models.submission import SubmissionModel

# for now, keep everything under one user model with some columns empty if the user is a company
# later if we refactor, we should separate the models


class UserModel(db.Model):
    __tablename__ = 'users'

    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    active = db.Column(db.Boolean, nullable=False, server_default='0')
    user_role = db.Column(db.String(25), nullable=False)
    # for students:
    email = db.Column(db.String(255))
    starred_challenges = db.relationship("ChallengeModel", lazy=True)
    submissions = db.relationship("SubmissionModel", lazy=True)
    # for companies:
    company_name = db.Column(db.String(255))
    company_description = db.Column(db.String(1000))

    def __init__(self, username, password, user_role,
                 company_name, company_description, email):
        self.username = username
        self.password = password
        self.user_role = user_role
        if user_role == 'student':
            self.email = email
            self.company_name = ""
            self.company_description = ""
        else:
            self.email = ""
            self.company_name = company_name
            self.company_description = company_description

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_by_username(cls, username):
        return cls.query.filter_by(username=username).first()

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()
