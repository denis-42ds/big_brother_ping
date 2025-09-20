package com.example.schedulerservice.utils;

import javax.net.ssl.HttpsURLConnection;
import java.io.IOException;
import java.net.URL;
import java.security.cert.Certificate;
import java.security.cert.X509Certificate;

public class SSLCheck {
    public static void checkSsl(String urlStr) throws Exception {

        URL url = new URL(urlStr);
        HttpsURLConnection conn = (HttpsURLConnection) url.openConnection();

        try {
            conn.connect();

            // Получаем сертификат
            Certificate[] certificates = conn.getServerCertificates();
            X509Certificate certificate = (X509Certificate) certificates[0];

            // Информация о сертификате
            System.out.println("Issuer DN: " + certificate.getIssuerX500Principal().getName());
            System.out.println("Subject DN: " + certificate.getSubjectX500Principal().getName());
            System.out.println("Serial Number: " + certificate.getSerialNumber());
            System.out.println("Valid From: " + certificate.getNotBefore());
            System.out.println("Valid To: " + certificate.getNotAfter());

        } catch (IOException e) {
            System.err.println("Failed to connect or retrieve certificate information: " + e.getMessage());
        } finally {
            conn.disconnect();
        }
    }
}
