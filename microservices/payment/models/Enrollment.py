from sqlalchemy import Column, ForeignKey, Integer
from sqlalchemy.orm import relationship

from .base import Base


class Enrollment(Base):
    __tablename__ = 'enrollments'

    id = Column(Integer, primary_key=True)
    course_id = Column(Integer, ForeignKey('courses.id'))
    payment_id = Column(Integer, ForeignKey('payments.id'))

    course = relationship('Course', lazy='joined')
    payment = relationship('Payment')
