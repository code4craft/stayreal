package live.hz.iserver.lib.util;

import java.io.*;

/**
 * Created with IntelliJ IDEA.
 * User: rain
 * Date: 11/9/13
 * Time: 12:53 PM
 * To change this template use File | Settings | File Templates.
 */
public class FileUtil {

    private static String projPath = System.getProperty("user.dir");

    /**
     * 读取一个文件的内容
     */
    public static String views(String fileName) {
        return fileStr(projPath + Conf.getValue("viewsRoot") + fileName);
    }

    public static String staticFile(String absPath) {
        return fileStr(projPath + absPath).toString();
    }

    /**
     * 读取一个文件的内容
     */
    public static String fileStr(String absPath) {
        StringBuilder sb = new StringBuilder();
        try {
            BufferedReader br = new BufferedReader(new FileReader(new File(absPath)));
            String str = null;
            while ((str = br.readLine()) != null) {
                sb.append(str);
            }
            return sb.toString();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 读取一个文件的内容
     */
    public static InputStream fileIS(String absPath) {
        try {
            return new FileInputStream(projPath + absPath);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        return null;
    }

}
