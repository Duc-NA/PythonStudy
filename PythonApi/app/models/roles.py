from ..utils import db ,ma

class Role(db.Model):
    __tablename__ ='role'
    Id=db.Column(db.Integer(),primary_key=True)
    RoleName=db.Column(db.String(45))
    RoleCode=db.Column(db.String(45))
    Description=db.Column(db.String(255))


    def save(self):
        db.session.add(self)
        db.session.commit()

class RoleSchema(ma.Schema):
    class Meta:
        fields = ("Id", "RoleName", "RoleCode","Description")
        model = Role