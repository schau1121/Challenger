from email.policy import default
from enum import unique
from click import password_option
from sqlalchemy import null, PickleType
from sqlalchemy.ext.mutable import MutableList
from db import db


class StudentUserModel(db.Model):
    __tablename__ = "student-users"
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    username = db.Column(db.String(50), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255))
    starred_challenge_ids = db.Column(MutableList.as_mutable(PickleType),
                                      default=[]
                                      )
    submissions = db.relationship("SubmissionModel", back_populates="student")

    def __init__(self, username, password, email):
        self.username = username
        self.password = password
        self.email = email

    def json(self):
        return {
            "username": self.username,
            "email": self.email,
            "starred_challenge_ids": self.starred_challenge_ids,
            "submissions": [submission.json() for submission in self.submissions]
        }

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_by_username(cls, username):
        return cls.query.filter_by(username=username).first()


class CompanyUserModel(db.Model):
    __tablename__ = 'company-users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)
    company_name = db.Column(db.String(255), unique=True)
    company_description = db.Column(db.String(1000))
    company_challenges = db.relationship("ChallengeModel", lazy=True)

    def __init__(self, username, password, company_name, company_description):
        self.username = username
        self.password = password
        self.company_name = company_name
        self.company_description = company_description

    def json(self):
        return {
            "company_name": self.company_name,
            "company_description": self.company_description,
            "company_challenges": [challenge.json() for challenge in self.company_challenges]
        }

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_by_company_name(cls, company_name):
        return cls.query.filter_by(company_name=company_name).first()
