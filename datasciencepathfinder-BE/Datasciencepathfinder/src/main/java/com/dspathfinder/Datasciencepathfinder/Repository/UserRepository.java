    package com.dspathfinder.Datasciencepathfinder.Repository;

    import com.dspathfinder.Datasciencepathfinder.Model.Users;
    import org.springframework.data.jpa.repository.JpaRepository;
    import org.springframework.stereotype.Repository;

    import java.util.Optional;

    @Repository
    public interface UserRepository extends JpaRepository<Users,Integer> {
        Optional<Users> findByUserEmail(String userEmail);
    }
