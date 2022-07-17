from re import sub
from sqlalchemy import null
from db import db

# Submission form contains:
# - name
# - user_id
# - github repository url
# - drive url


class SubmissionModel(db.Model):
    __tablename__ = 'submissions'

    id = db.Column(db.Integer, primary_key=True)
    submission_id = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("student-users.id"))
    student = db.relationship("StudentUserModel")
    github_repo_url = db.Column(db.String(255))
    google_drive_url = db.Column(db.String(255))
    challenge_id = db.Column(
        db.String(255), db.ForeignKey("challenges.challenge_id"))
    challenge = db.relationship("ChallengeModel")

    def __init__(self, name, user_id, github_repo_url, google_drive_url, challenge_id, submission_id):
        self.name = name
        self.user_id = user_id
        self.github_repo_url = github_repo_url
        self.google_drive_url = google_drive_url
        self.challenge_id = challenge_id
        self.submission_id = submission_id

    def json(self):
        return {
            'name': self.name,
            'user_id': self.user_id,
            'github_repo_url': self.github_repo_url,
            'google_drive_url': self.google_drive_url,
            'challenge_id': self.challenge_id,
            'submission_id': self.submission_id
        }

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_by_id(cls, submission_id):
        return cls.query.filter(submission_id == submission_id).first()
