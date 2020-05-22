package edu.gacademy.contentmanagement.services;

import edu.gacademy.contentmanagement.entities.Teacher;
import edu.gacademy.contentmanagement.entities.User;
import edu.gacademy.contentmanagement.protocols.*;
import edu.gacademy.contentmanagement.repositories.TeacherRepository;
import io.grpc.Status;
import io.grpc.stub.StreamObserver;
import org.lognet.springboot.grpc.GRpcService;
import org.springframework.beans.factory.annotation.Autowired;

@GRpcService
public class AccountManagementService extends AccountManagementGrpc.AccountManagementImplBase {

    private final TeacherRepository teacherRepository;

    @Autowired
    public AccountManagementService(TeacherRepository teacherRepository) {
        this.teacherRepository = teacherRepository;
    }

    @Override
    public void getAccount(
            GetAccountRequest request,
            StreamObserver<GetAccountResponse> responseObserver
    ) {
        User user = ContextEntries.USER.get();
        if (user == null) {
            responseObserver.onError(ContextEntries.AUTHENTICATION_ERROR.get());
            return;
        }

        GetAccountResponse response = GetAccountResponse.newBuilder()
                .setFirstName(user.getFirstName())
                .setLastName(user.getLastName())
                .setEmail(user.getEmail())
                .setIsTeacher(user.getTeacher() != null)
                .build();

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }

    @Override
    public void becomeTeacher(
            BecomeTeacherRequest request,
            StreamObserver<BecomeTeacherResponse> responseObserver
    ) {
        User user = ContextEntries.USER.get();
        if (user == null) {
            responseObserver.onError(ContextEntries.AUTHENTICATION_ERROR.get());
            return;
        }

        if (user.getTeacher() != null) {
            responseObserver.onError(Status.ALREADY_EXISTS
                    .withDescription("Already a teacher")
                    .asRuntimeException()
            );
            return;
        }

        Teacher teacher = new Teacher();
        teacher.setUser(user);
        teacherRepository.save(teacher);

        responseObserver.onNext(BecomeTeacherResponse.newBuilder().build());
        responseObserver.onCompleted();
    }
}
