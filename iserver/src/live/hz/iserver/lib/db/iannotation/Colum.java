package live.hz.iserver.lib.db.iannotation;

import java.lang.annotation.*;

/**
 * Created with IntelliJ IDEA.
 * User: rain
 * Date: 11/10/13
 * Time: 12:37 PM
 * To change this template use File | Settings | File Templates.
 */
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
public @interface Colum {

    public String name();

    public String format();

    public String type();

}
