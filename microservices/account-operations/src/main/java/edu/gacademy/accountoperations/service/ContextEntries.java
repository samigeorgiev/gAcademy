package edu.gacademy.accountoperations.service;

import edu.gacademy.accountoperations.entities.User;
import io.grpc.Context;

public class ContextEntries {

    public static final Context.Key<User> USER = Context.key("user");
}
