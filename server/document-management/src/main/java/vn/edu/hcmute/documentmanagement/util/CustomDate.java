package vn.edu.hcmute.documentmanagement.util;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

@Slf4j
@Data
@AllArgsConstructor
@Builder
public class CustomDate {
    public static final String DATE_FORMAT = "yyyy-MM-dd HH:mm:ss";
    DateFormat dateFormat;
    Calendar calendar;

    public CustomDate(){
        dateFormat = new SimpleDateFormat(DATE_FORMAT);
        calendar = Calendar.getInstance();
    }
    public CustomDate(String dateFormat){
        this.dateFormat = new SimpleDateFormat(dateFormat);
        calendar = Calendar.getInstance();
    }
    public CustomDate(Calendar calendar) {
        dateFormat = new SimpleDateFormat(DATE_FORMAT);
        this.calendar = calendar;
    }
    public Date parse(String dateStr)  {
        Date date = null;
        try{
        date = dateFormat.parse(dateStr);
        }
        catch (ParseException exc){
            log.error("Date string is not a valid date: {}, at: {}", dateStr, exc.getErrorOffset());
        }
        return date;
    }
    public String getRightNow(){
        return this.dateFormat.format(calendar.getTime());
    }
}
