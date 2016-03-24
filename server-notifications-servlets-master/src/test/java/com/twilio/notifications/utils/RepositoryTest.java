package com.twilio.notifications.utils;

import com.twilio.notifications.models.Clients;
import org.junit.Test;

import java.util.ArrayList;

import static org.assertj.core.api.Assertions.assertThat;

public class RepositoryTest {
    @Test
    public void getClients_ArrayListOfClients() {
        ArrayList<Clients> clients = new Repository().getClients();

        assertThat(clients.size()).isEqualTo(2);
    }
}
