package com.example.schedulerservice.utils;

import com.example.schedulerservice.model.dto.ServerStatusForLogsDtoPage;
import com.example.schedulerservice.model.dto.response.ServerStatusForReport;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;

import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

public class CsvWriter {

    public static void writeToCsv(ServerStatusForLogsDtoPage serverLogs,
                                  String filePath,
                                  LocalDateTime reportFrom,
                                  LocalDateTime reportTo) {

        String header = "Server status report from " + reportFrom + " to " + reportTo;

        List<ServerStatusForReport> serverStatus = serverLogs.serverStatusForReports().getContent();

        try (FileWriter fileWriter = new FileWriter(filePath);
             CSVPrinter csvPrinter = new CSVPrinter(fileWriter, CSVFormat.POSTGRESQL_CSV.withHeader(header))) {
            for (ServerStatusForReport status : serverStatus) {
                csvPrinter.printRecord(status);
            }
            csvPrinter.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
