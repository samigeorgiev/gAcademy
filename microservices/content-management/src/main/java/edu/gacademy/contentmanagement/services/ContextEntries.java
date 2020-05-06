package edu.gacademy.contentmanagement.services;

import edu.gacademy.contentmanagement.entities.User;
import io.grpc.Context;
import io.grpc.StatusRuntimeException;

public class ContextEntries {

    public static final Context.Key<User> USER = Context.key("user");

    public static final Context.Key<StatusRuntimeException> AUTHENTICATION_ERROR =
            Context.key("authentication error");
}
