import re
from flask_restful import Resource, reqparse
from models.submission import SubmissionModel


class Submission(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("name", type=str, required=True)
    parser.add_argument("user_id", type=int, required=True)
    parser.add_argument("github_repo_url", type=str)
    parser.add_argument("google_drive_url", type=str)
    parser.add_argument("challenge_id", type=str, required=True)

    def get(self, submission_id):
        submission = SubmissionModel.find_by_id(submission_id)
        if submission:
            return submission.json()
        else:
            return {
                "message": "Submission not found"
            }, 404

    def post(self, submission_id):
        data = Submission.parser.parse_args()
        submission = SubmissionModel.find_by_id(submission_id)
        if submission:
            return {"message": "A submission with that id already exists"}

        submission = SubmissionModel(data["name"], data["user_id"], data["github_repo_url"],
                                     data["google_drive_url"], data["challenge_id"], submission_id)
        submission.save_to_db()

        return {
            "message": "Submission created successfully"
        }, 201
