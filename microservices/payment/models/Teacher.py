from sqlalchemy import Column, Float, Integer

from .base import Base


class Teacher(Base):
    __tablename__ = 'teachers'

    id = Column(Integer, primary_key=True)
    week_profit = Column(Float)
