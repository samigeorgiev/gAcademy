package edu.gacademy.account_operations.grpc;

import io.grpc.Context;

public class ContextEntries {

    public static final Context.Key<Integer> USER_ID = Context.key("userId");
}
