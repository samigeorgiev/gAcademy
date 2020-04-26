from sqlalchemy import Column, Integer

from .base import Base


class Payment(Base):
    __tablename__ = 'payments'

    id = Column(Integer, primary_key=True)
