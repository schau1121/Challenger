from flask_restful import Resource, reqparse
from models.challenge import ChallengeModel


class Challenge(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('challenge_name', type=str, required=True)
    parser.add_argument("description", type=str, required=True)
    parser.add_argument("submission_instructions", type=str, required=True)
    parser.add_argument("company_id", type=int, required=True)

    def get(self, challenge_id):
        challenge = ChallengeModel.find_by_id(challenge_id)
        if challenge:
            return challenge.json()
        else:
            return {
                "message": "Challege not found"
            }, 404

    def post(self, challenge_id):
        challenge = ChallengeModel.find_by_id(challenge_id)
        if challenge:
            return {
                "message": "A challenge with that id already exists!"
            }
        data = Challenge.parser.parse_args()
        challenge = ChallengeModel(
            data["challenge_name"], data["challenge_description"], data["submission_instructions"], challenge_id)
        challenge.save_to_db()

        return {
            "message": "Challenge created successfully!"
        }, 201

    def put(self, challenge_id):
        data = Challenge.parser.parse_args()
        challenge = ChallengeModel.find_by_id(challenge_id)
        if challenge:
            if data["submission_instructions"] != "":
                challenge.submission_instructions = data["submission_instructions"]
            if data["description"] != "":
                challenge.description = data["description"]
            if data["challenge_name"] != "":
                challenge.challenge_name = data["challenge_name"]
            challenge.save_to_db()
        else:
            return {
                "message": "Challenge not found"
            }, 404

    def delete(self, challenge_id):
        challenge = ChallengeModel.find_by_id(challenge_id)
        if challenge:
            challenge.delete_from_db()

        return {"message": "Challenge deleted"}


class ChallengeList(Resource):
    def get(self):
        return {"challenges": [challenge.json() for challenge in ChallengeModel.query.all()]}
