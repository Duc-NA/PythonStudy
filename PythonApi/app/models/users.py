from ..utils import db ,ma

class User(db.Model):
    __tablename__ ='user'
    Id=db.Column(db.Integer(),primary_key=True)
    UserName=db.Column(db.String(45))
    Email=db.Column(db.String(100))
    Password=db.Column(db.String(255))
    Is_Active=db.Column(db.Boolean(),default=False)
    Is_Staff=db.Column(db.Boolean(),default=False)


    def save(self):
        db.session.add(self)
        db.session.commit()

class UserSchema(ma.Schema):
    class Meta:
        fields = ("Id", "UserName", "Email","Password","Is_Active","Is_Staff")
        model = User