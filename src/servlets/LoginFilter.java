package servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Servlet Filter implementation class LoginFilter
 */
@WebFilter("/admin/")
public class LoginFilter implements Filter {
	public static final String ACCES_PUBLIC     = "/";
    public static final String ATT_SESSION_USER = "sessionMembre";
   
	
	
    /**
     * @see HttpFilter#HttpFilter()
     */
    public LoginFilter() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see Filter#destroy()
	 */
	public void destroy() {
		// TODO Auto-generated method stub
	}

	/**
	 * @see Filter#doFilter(ServletRequest, ServletResponse, FilterChain)
	 */
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		// TODO Auto-generated method stub
		// place your code here
		
        /* Cast de request et response */
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;
        
        try {
        Cookie[] cookies = req.getCookies();
        
        Map<String, Cookie> cookieMap = new HashMap<>();
        for (Cookie cookie : cookies) {
            cookieMap.put(cookie.getName(), cookie);
        }
        
        
        Cookie sessionCookie = cookieMap.get("sessionMembre");
		       
        if ( sessionCookie.getValue() != null ) {
		        	/* Affichage du dashboard */
		            chain.doFilter( req, res );
		} else {
		        	/* Redirection vers le public */
		        	res.sendRedirect( req.getContextPath() + ACCES_PUBLIC );
		}
        } catch (Exception e) {
        	res.sendRedirect( req.getContextPath() + ACCES_PUBLIC );
        }

		}

	/**
	 * @see Filter#init(FilterConfig)
	 */
	public void init(FilterConfig fConfig) throws ServletException {
		// TODO Auto-generated method stub
	}

}
