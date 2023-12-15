from ..utils import db ,ma

class UserRole(db.Model):
    __tablename__ ='user_role'
    Id=db.Column(db.Integer(),primary_key=True)
    RoleId=db.Column(db.Integer(),primary_key=True)
    UserId=db.Column(db.Integer(),primary_key=True)

    def save(self):
        db.session.add(self)
        db.session.commit()

class UserRoleSchema(ma.Schema):
    class Meta:
        fields = ("Id", "RoleId", "UserId")
        model = UserRole