package edu.gacademy.accountoperations;

import edu.gacademy.accountoperations.clients.AuthenticationClient;
import edu.gacademy.accountoperations.entities.Teacher;
import edu.gacademy.accountoperations.entities.User;
import edu.gacademy.accountoperations.protocols.BecomeTeacherRequest;
import edu.gacademy.accountoperations.protocols.BecomeTeacherResponse;
import edu.gacademy.accountoperations.service.AccountOperationsImpl;
import edu.gacademy.accountoperations.service.ContextEntries;
import io.grpc.Context;
import io.grpc.Status;
import io.grpc.stub.StreamObserver;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

@SpringBootTest
public class AccountOperationsImplTest {

    @MockBean
    private AuthenticationClient authenticationClient;

    @Autowired
    private AccountOperationsImpl service;

    @Test
    public void becomeTeacher_givenExistingTeacher_expectedAlreadyExistsError() {
        User user = new User();
        user.setId(1);
        user.setTeacher(new Teacher());
        StreamObserver<BecomeTeacherResponse> responseObserver = mock(StreamObserver.class);

        Context.current().withValue(ContextEntries.USER, user).run(() ->
                service.becomeTeacher(BecomeTeacherRequest.newBuilder().build(), responseObserver)
        );

        ArgumentCaptor<Throwable> errorArgumentCaptor = ArgumentCaptor.forClass(Throwable.class);
        verify(responseObserver).onError(errorArgumentCaptor.capture());
        Throwable expectedException = Status.ALREADY_EXISTS
                .withDescription("User is already a teacher")
                .asRuntimeException();
        Throwable actualException = errorArgumentCaptor.getValue();
        assertEquals(expectedException.getMessage(), actualException.getMessage());
    }
}
