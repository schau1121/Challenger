from datetime import datetime
from sqlalchemy import desc, null
from db import db
from models.users import UserModel
from models.submission import SubmissionModel

# challenge form contains:
# - challenge-name
# - description
# - submission instructions
# - date created
# - submissions submitted


class ChallengeModel(db.Model):
    __tablename__ = 'challenges'

    challenge_id = db.Column(db.Integer, primary_key=True)
    challenge_name = db.Column(db.String(255))
    description = db.Column(db.String(1000))
    submission_instructions = db.Column(db.String(1000))
    date_created = db.Column(db.Date())
    submissions = db.Relationship("SubmissionModel", lazy=True)

    def __init__(self, challenge_name, description, submission_instructions):
        self.challenge_name = challenge_name
        self.description = description
        self.submission_instructions = submission_instructions
        self.date_created = datetime.date.today()

    def json(self):
        return {
            "challenge_name": self.challenge_name,
            "description": self.description,
            "submission_instructions": self.submission_instructions,
            "date_created": self.date_created,
            "submissions": [submission.json() for submission in self.submissions]
        }

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(challenge_id=_id).first()
